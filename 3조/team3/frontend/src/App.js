import { BrowserRouter, Routes, Route } from "react-router-dom";

import URL from "./constants/Url";

import Home from "./pages/Home";
import Introduce from "./pages/Introduce";
import News from "./pages/News";
import QnA from "./pages/QnA";
import Login from "./pages/Login";
import Header from "./components/Header";

import "./css/index.css";
import "./css/App.css";
import "./css/modal.css";
import Signup from "./pages/Signup";
import { useState } from "react";
import QnAWrite from "./pages/QnAWrite";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} />
        <main>
          <Routes>
            <Route path={URL.HOME} element={<Home />} />
            <Route path={URL.INTRODUCE} element={<Introduce />} />
            <Route path={URL.NEWS} element={<News />} />
            <Route path={URL.Q_A} element={<QnA />} />
            <Route path={URL.Q_A_WRITE} element={<QnAWrite />} />
            <Route
              path={URL.LOGIN}
              element={
                <Login
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  setUserInfo={setUserInfo}
                />
              }
            />
            <Route path={URL.SIGNUP} element={<Signup />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
