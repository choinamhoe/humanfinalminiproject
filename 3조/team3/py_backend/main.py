import uvicorn, sys, io, cv2
import numpy as np 
from fastapi import FastAPI, File, UploadFile, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf

app = FastAPI()
origins = [
    "http://localhost:3301",  
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],     
)
model = tf.keras.models.load_model("./model.h5")
classes = [
    "태선화/과다색소침착",
    "농포/여드름",
    "결절/종괴",
    "무증상",
]

@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    try:
        print(image)
        # 업로드된 파일 읽기
        contents = await image.read()
        # 바이너리 데이터를 NumPy 배열로 변환
        nparr = np.frombuffer(contents, np.uint8)
        # OpenCV로 이미지 디코딩
        img_arr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img_arr is None:
            return JSONResponse(content={"error": "이미지 디코딩 실패"}, status_code=400)
        img_arr = img_arr[..., ::-1]  # BGR -> RGB
        img_arr = cv2.resize(img_arr, (224, 224))

        predictions = model.predict(img_arr[np.newaxis])
        probabilities = predictions[0]  # (num_classes,) 형태

        # 가장 높은 확률의 클래스 선택
        max_idx = np.argmax(probabilities)
        max_disease = classes[max_idx]
        max_accuracy = float(probabilities[max_idx])
        message = f"{max_accuracy*100:.2f}% 확률로 '{max_disease}'이(가) 의심됩니다."

        result = {"message":message}

        return JSONResponse(content=result, status_code=status.HTTP_200_OK)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
    
if __name__ == "__main__":
    print("파이썬으로 직접 실행")
    try:
        uvicorn.run(
            "main:app", 
            host="0.0.0.0", port=5001, reload=True)
    except Exception as e:
        sys.exit(1)
