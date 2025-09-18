import pandas as pd
from sqlalchemy import create_engine
df = pd.read_csv("./Source/제주시 착한가게 현황.csv", encoding="cp949")
df["regDt"] = pd.to_datetime(df["regDt"])
engine = create_engine("mysql+pymysql://dev:dev1234@localhost:13307/goodstore")
df.to_sql(name="shops", con=engine, if_exists="replace", index=False)

