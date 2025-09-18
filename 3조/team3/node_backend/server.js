const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

// 미들웨어 불러오기
const {
  jsonMiddleware, // JSON 바디 파싱
  corsMiddleware, // CORS 설정
  cookieMiddleware, // 쿠키 파싱
  sessionMiddleware, // 세션 관리
} = require("./src/middlewares");

const { BACKEND_PORT } = require("./src/config"); // 백엔드 서버 포트
const userRoutes = require("./src/routes/user"); // 사용자 관련 라우트 (/signup, /login 등)
// const postsRoutes = require("./src/routes/QnA"); // QnA 게시판 관련 라우트
// const predictRoutes = require("./src/routes/predict"); // 이미지 예측 관련 라우트

// ----------------- 서버 생성 -----------------
const app = express();

// ----------------- 미들웨어 등록 -----------------
app.use(jsonMiddleware); // POST/PUT 요청 시 JSON 데이터 처리
app.use(corsMiddleware); // 프론트엔드 도메인 허용 + 자격증명 전달
app.use(cookieMiddleware); // 쿠키 데이터 파싱
app.use(sessionMiddleware); // 세션 관리 (로그인 정보 저장 등)

// ----------------- 라우트 등록 -----------------
app.use("/users", userRoutes); // /users/signup, /users/login 등
// app.use("/posts", postsRoutes); // QnA 게시판 CRUD
// app.use("/predict", predictRoutes); // 이미지 업로드 및 예측

// ----------------- 테스트용 라우트 -----------------
app.get("/check-session", (req, res) => {
  console.log(req.session.user); // 현재 세션 정보 로그
  res.json({ session: req.session });
});

// ----------------- 서버 기동 -----------------
app.listen(BACKEND_PORT, () => {
  console.log(`🚀 Server running on http://localhost:${BACKEND_PORT}`);
});
