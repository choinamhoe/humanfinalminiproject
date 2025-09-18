import pytz, datetime, requests
import numpy as np 
import pandas as pd
from config.config import config

idx = 0
SERVICE_KEYS = config["SERVICE_KEYS"].split(",")
GOLF_LOCATIONS = pd.DataFrame({
    "Latitude": [37.5665, 35.1796],
    "Longitude": [126.9780, 129.0756],
    "x": [60, 98],
    "y": [127, 76]
})
# --- 위치 관련 (기존 find_closest_location 대체) ---
def find_closest_location(lat, lon):
    # GOLF_LOCATIONS 데이터프레임 사용
    closest, nx, ny = find_closest_location2(
        lat, lon,
        location_df=GOLF_LOCATIONS,
        lat_col="Latitude",
        lon_col="Longitude",
        x_col="x",
        y_col="y"
    )
    # nx, ny를 정수로 변환 (기상청 API 요구)
    nx = int(nx)
    ny = int(ny)
    return closest, nx, ny


def find_closest_location2(lat, lon, location_df, lat_col, lon_col, x_col, y_col):
    from geopy.distance import geodesic

    # 거리 계산 함수
    location_df = location_df.copy()
    location_df['distance'] = location_df.apply(
        lambda row: geodesic((lat, lon), (row[lat_col], row[lon_col])).kilometers,
        axis=1
    )
    closest = location_df.loc[location_df['distance'].idxmin()]
    nx = closest[x_col]
    ny = closest[y_col]
    return closest, nx, ny


def fetch_weather_kma(lat, lon):
    global idx 
    idx += 1
    idx = idx%len(SERVICE_KEYS)
    SERVICE_KEY = SERVICE_KEYS[idx]
    closest, nx, ny = find_closest_location(lat, lon)
    seoul_tz = pytz.timezone("Asia/Seoul")
    now = datetime.datetime.now(seoul_tz)
    base_date = now.strftime("%Y%m%d")
    base_time = (now.replace(minute=0, second=0) - pd.Timedelta(hours=1)).strftime("%H%M")

    # --- 테스트 모드 (SERVICE_KEY가 없는 경우 랜덤 데이터 생성) ---
    if SERVICE_KEY is None:
        hours = pd.date_range(start=now, periods=6, freq="H", tz=seoul_tz)
        rng = np.random.default_rng(123)
        df = pd.DataFrame({
            "time": hours,
            "temperature": 10 + 5*rng.normal(size=len(hours)),
            "humidity": np.clip(60 + 20*rng.normal(size=len(hours)), 0, 100),
            "wind_speed": np.clip(3 + 2*rng.normal(size=len(hours)), 0, 20),
            "visibility": 10000,
            "precip_prob": 0.00,   # 초단기예보에는 없음
            "precipitation": np.clip(0 + 10*rng.normal(size=len(hours)), 0, 100),
            "precip_type": 0         # 없음
        })
        return df

    url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"
    params = {"serviceKey": SERVICE_KEY, "numOfRows":1000, "pageNo":1,
              "dataType":"JSON","base_date":base_date,"base_time":base_time,
              "nx":int(nx),"ny":int(ny)}
    resp = requests.get(url, params=params, timeout=15)

    resp.raise_for_status()
    data = resp.json()
    #print(f"resp.json data :{data}")  # <- 먼저 API 응답 구조 확인
    items = data["response"]["body"]["items"]["item"]
    df_raw = pd.DataFrame(items)
    df_raw["datetime"] = pd.to_datetime(df_raw["fcstDate"] + df_raw["fcstTime"], format="%Y%m%d%H%M").dt.tz_localize(seoul_tz)
    pivot = df_raw.pivot(index="datetime", columns="category", values="fcstValue").reset_index()
    # --- 초단기예보에 맞게 DF 생성 ---
    try:
        df = pd.DataFrame({
            "time": pivot["datetime"],
            "temperature": pivot["T1H"].astype(float) if "T1H" in pivot.columns else 0.0,
            "humidity": pivot["REH"].astype(float) if "REH" in pivot.columns else 0.0,
            "wind_speed": pivot["WSD"].astype(float) if "WSD" in pivot.columns else 0.0,
            "visibility": 10000,
            "precip_prob": 0.00,  # 초단기예보에는 POP 없음
            "precipitation": pivot["RN1"].apply(parse_precip) if "RN1" in pivot.columns else 0.0,
            "precip_type": pivot["PTY"].astype(int) if "PTY" in pivot.columns else 0
        })
    except Exception as e:
        print("pivot error:", e)
    return df


def parse_precip(pcp_str):
    #print(f"강수량 start : {pcp_str}")
    """
    기상청 초단기예보 PCP(강수량) 문자열을 float(mm)로 변환
    """
    if pcp_str is None or (isinstance(pcp_str, float) and np.isnan(pcp_str)):
        print("parse_precip 강수량이 nan")
        return 0.0
    try:
        if isinstance(pcp_str, str):
            s = pcp_str.strip()

            # --- 케이스 1: 강수 없음
            if s in ["강수없음", "0", "0.0"]:
                return 0.0

            # --- 케이스 2: 1mm 미만 (띄어쓰기 포함)
            if "1mm미만" in s or "1mm 미만" in s:
                return 0.5  # 0~1mm → 평균 0.5로 가정

            # --- 케이스 3: 범위 (~)
            if "~" in s:
                parts = s.replace("mm", "").replace(" ", "").split("~")
                try:
                    start, end = map(float, parts)
                    return (start + end) / 2
                except:
                    return 0.0

            # --- 케이스 4: 이상 (최소값 기준)
            if "이상" in s:
                try:
                    val = float(s.replace("mm 이상", "").replace("mm이상", "").strip())
                    return val + 5.0  # 최소값 + 보정치
                except:
                    return 10.0  # fallback

            # --- 케이스 5: 단순 숫자(mm 단위 포함)
            if "mm" in s:
                return float(s.replace("mm", "").strip())

            # --- 케이스 6: 숫자만
            return float(s)

        # 숫자형 (float/int)
        elif isinstance(pcp_str, (int, float)):
            if np.isnan(pcp_str):
                return 0.0
            return float(pcp_str)

    except Exception as e:
        print("precip parse error:", pcp_str, type(pcp_str), e)
        return 0.0
