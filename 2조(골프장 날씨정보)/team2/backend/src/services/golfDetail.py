from models.golfDetail import post_model_golfDetail
import pandas as pd
from utils.prediction import fetch_weather_kma
# from common.golf_weather_pipeline import predict_weather_for_location
# from common.commonDf import dftoDict, postprocess_weather

file_path = "./source/기상청41_단기예보 조회서비스_오픈API활용가이드_격자_위경도(2411).xlsx"
locationInfo = pd.read_excel(file_path)
locationInfo = locationInfo[["경도(초/100)","위도(초/100)","격자 X","격자 Y"]]
locationInfo.columns = ["lon","lat","x", "y"]

def post_services_golfDetail(id):
   print(f"services post_services_golfDetail start id : {id}")
   res = dict()
   #id로 골프상세정보 가져옴
   golfDetail = post_model_golfDetail(id)

   #현재 골프장 정보에 대한 위도,경도
   lon = golfDetail.loc[:,"Longitude"].values[0]
   lat = golfDetail.loc[:,"Latitude"].values[0]
   forecast_df = fetch_weather_kma(lat, lon)

   # DataFrame도 앞 6개로 잘라서 summary[:6]과 맞추기
   # df_head6 = forecast_df.head(6).copy()
   # df_head6["summary"] = summary[:6]
   # forecast_df = pd.concat([df_head6, forecast_df.iloc[6:]], axis=0)
   #print(forecast_df[["time","summary"]].head(10))

   # print("\n=== Summary 리스트 출력 ===")
   # for line in summary[:6]:
   #    print(line)

   #골프장 정보 상세
   name = 'golfInfo'
   # golfDetailJson = dftoDict(golfDetail,name)
   # res.update(golfDetailJson)


   #골프장 6시간 후 날씨정보
   # name = 'golfCurrentWeather'
   # timeColumn = "datetime"
   # current_weather[timeColumn] = current_weather[timeColumn].astype(str)
   # golfCurrentWeather = dftoDict(current_weather,name)
   # # print(f"골프장 6시간 후 날씨정보 딕셔너리로 변환 : {golfCurrentWeather}")
   # res.update(golfCurrentWeather)

   #골프장 24시간 후 날씨정보
   name = 'golf24HourWeather'
   timeColumn = "time"
   # forecast_df[timeColumn] = forecast_df[timeColumn].astype(str)
   # forecast_df  = forecast_df.to_dict(orient='records')
   # forecast_df = postprocess_weather(forecast_df,timeColumn)
   #golf24HourWeather = dftoDict(forecast_df,name)
   # golf24HourWeather = {name : forecast_df}
   # print(golf24HourWeather)
   #print(f"골프장 24시간 후 날씨정보 딕셔너리로 변환 : {golf24HourWeather}")
   # res.update(golf24HourWeather)
  
   #print(f" post_services_golfDetail end")
  
   return res