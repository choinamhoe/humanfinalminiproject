# 🐾 반려동물 피부 질환 분류 서비스

본 프로젝트는 **반려동물의 피부 질환**을 자동으로 분류하여
빠르고 정확한 관리와 치료를 돕기 위한 서비스입니다.

---

<div style="display: flex; align-items: center; gap: 8px;">
  <div>
    <img src="https://img.shields.io/badge/Licence-GPL-1177AA.svg?style=flat-round" />
    <img src="https://img.shields.io/badge/Version-0.0.1-1177AA.svg?style=flat-round" />
    <img
        src="https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white" alt="HTML" />
    <img
      src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS&logoColor=white" alt="CSS Badge" />
    <img
    src="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/react-1177AA?logo=react&logoColor=%2361DAFB" alt="React" />
    <br/>
    <img src="https://img.shields.io/badge/python-3.10.0-1177AA.svg?style=flat-round" alt="Python" />
    <img src="https://img.shields.io/badge/FastAPI-02569B?logo=FastAPI&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/github-%23121011?logo=github&logoColor=white" alt="GitHub" />
    <img src="https://img.shields.io/badge/Docker-1572B6?logo=docker&logoColor=fff" />
    <img src="https://img.shields.io/badge/Docker--Compose-000000?logo=docker&logoColor=white" />
    <img src="https://img.shields.io/badge/MySQL-1572B6?logo=mysql&logoColor=fff" />

  </div>
</div>

![시연](./Source/QnA_1_.gif)

## 💡 개발 배경 및 목적

요즘 반려견 인구가 늘어난 만큼 유기견에 대한 관심도 높은 시대입니다. 저희는 길에서 만난 유기견이 반려견에 비해 쉽게 걸리는 피부병에 가중치를 높여서 피부병을 판별하는 모델을 개발하였습니다. 해당 사이트에 유기견의 피부를 업로드를 통해 피부병을 판별할 수 있는 사이트입니다.

## ⚙️ 서비스 핵심 기능

**[주요기능]**

- 반려견 피부질환군 분류 구현: MobileNet v2 기반의 전이학습 모델 활용

## 📆 개발 과정

- 개발 기간은 9월 8일부터 9월 16일까지 진행(팀 배정 및 주제선정, 발표 자료 작성 기간 포함)
- 개발 과정은 오전 회의 진행, 및 오전/오후 일정 파악 수행

## 📦 설치 및 실행

### python backend

```bash
# python backend는 python 3.10.0 버전 환경에서 진행
# conda env create -f conda-env-cpu.yml 로 생성 가능
conda env create -f conda-env-cpu.yml

conda activate pat_310
cd  py_backend
```

### node backend

```bash
cd node_backend
npm install
npm run start
```

### frontend

```bash
cd frontend
npm install
npm run start

depcheck # 코드에서 안쓰는 패키지 목록 확인
SET PORT=3001 && npm run start # 다른 포트로 시작(Windows)
```

### DataBase

```bash
cd DB
docker-compose up -d
# db관련 툴 활용하여 init.sql 실행
cd ../ # JejuGoodStore 경로로 이동
python Scripts/main.py
```

## 🚧 향후 개발 계획

## ©️License

본 프로젝트의 코드는 비상업적 용도로 자유롭게 사용하실 수 있습니다.
상업적 이용이나 수정, 재배포 시에는 사전 연락을 부탁드립니다.

문의는 이메일()로 해주시기 바랍니다.

## 📖 Reference

데이터 출처 : [NIA - AIHub(반려동물 피부질환 데이터)](https://www.aihub.or.kr/aihubdata/data/view.do?searchKeyword=%EB%B0%98%EB%A0%A4%EA%B2%AC+%EC%A7%88%ED%99%98&aihubDataSe=data&dataSetSn=561)

## 👨‍💻👩‍💻 Collaborator

- 프론트 개발
  - [이선혁(M), 허재령(S), 이향래](https://github.com/JoonYeong-Yoon/frontend)
- DB 및 백엔드 개발
  - [윤준영](https://github.com/JoonYeong-Yoon/backend)
- DB 및 AI 개발
  - [이용성](https://github.com/JoonYeong-Yoon/AI-modeling)
