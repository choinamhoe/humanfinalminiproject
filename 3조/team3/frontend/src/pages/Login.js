import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/user";

const Login = ({ isLogin, setIsLogin, setUserInfo }) => {
  const navigate = useNavigate();

  const [userUid, setUserUid] = useState("");
  const [password, setPassword] = useState("");

  const onChangeForUserUid = (event) => {
    setUserUid(event.target.value);
  };
  const onChangeForPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userUid && password) {
      try {
        const res = await loginApi(userUid, password);
        setUserInfo(res.data);
        setIsLogin(true);
        console.log(res);
        console.log("로그인 성공:", { userUid, password });
      } catch (err) {
        if (err.response?.data?.error) {
          alert(err.response.data.error);
        } else {
          alert("회원가입 중 오류 발생");
        }
        console.error("err", err);
      }
    } else {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <>
      {isLogin ? (
        <>
          <p>로그인 상태</p>
        </>
      ) : (
        <>
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label>아이디(이메일)</label>
              <input
                type="email"
                value={userUid}
                onChange={onChangeForUserUid}
                placeholder="test@naver.com"
              />
            </div>
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={onChangeForPassword}
                placeholder="비밀번호"
              />
            </div>
            <div>
              <button type="submit">로그인</button>
              <button type="button" onClick={() => navigate("/signup")}>
                회원가입
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
