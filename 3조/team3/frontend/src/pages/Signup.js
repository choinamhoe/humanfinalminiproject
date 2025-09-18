import { useState } from "react";
import { useNavigate } from "react-router-dom";

import URL from "../constants/Url";
import { SignupApi } from "../api/user";

const Signup = () => {
  const navigate = useNavigate();

  const [userUid, setUserUid] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangeForUserUid = (e) => setUserUid(e.target.value);
  const onChangeForPassword = (e) => setPassword(e.target.value);
  const onChangeForName = (e) => setName(e.target.value);
  const onChangeForPhoneNumber = (e) => setPhoneNumber(e.target.value);

  const onclickForSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await SignupApi(userUid, password, name, phoneNumber);
      console.log(response, URL.HOME);
      if (response.status === 201) {
        navigate(URL.HOME);
        alert("회원가입 성공!");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("회원가입 중 오류 발생");
      }
      console.error(err);
    }
  };
  return (
    <form>
      <h1>회원가입</h1>
      <div>
        <label>ID</label>
        <input
          type="email"
          value={userUid}
          onChange={onChangeForUserUid}
          placeholder="이메일 형식 아이디"
        />
      </div>
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        onChange={onChangeForPassword}
        placeholder="비밀번호"
      />
      <label>사용자 이름</label>
      <input
        type="text"
        value={name}
        onChange={onChangeForName}
        placeholder="사용자 이름"
      />
      <label>전화번호</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={onChangeForPhoneNumber}
        placeholder="예: 010-1234-5678"
      />
      <button onClick={onclickForSignup}>회원가입</button>
    </form>
  );
};

export default Signup;
