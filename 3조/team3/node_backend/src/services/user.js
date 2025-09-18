const bcrypt = require("bcryptjs");

const userModel = require("../models/user");
const { validateEmail, validatePassword } = require("../utils/validators");

async function signup(userUid, password, name, phoneNumber) {
  console.log(userUid, password, name, phoneNumber);
  if (!userUid) throw new Error("이메일을 입력해주세요.");
  if (!password) throw new Error("비밀번호를 입력해주세요.");
  if (!name) throw new Error("이름을 입력해주세요.");
  if (!phoneNumber) throw new Error("전화번호를 입력해주세요.");

  if (!validateEmail(userUid)) {
    throw new Error("유효한 이메일 주소를 입력해주세요.");
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    throw new Error(passwordError);
  }

  const exists = await userModel.findByUserUid(userUid);
  if (exists.length > 0) {
    throw new Error("이미 존재하는 사용자명입니다.");
  }
  // 비밀번호 해시 처리
  const hashed = await bcrypt.hash(password, 10);
  await userModel.createUser(userUid, hashed, name, phoneNumber);
  return { message: "회원가입 성공" };
}

async function login(userUid, password) {
  const user = await userModel.findByUserUid(userUid);
  if (!user || user.length === 0) {
    throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");
  }
  const isValid = await bcrypt.compare(password, user[0].password);
  if (!isValid) throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");

  result = {
    userNo: user[0].userNo,
    id: user[0].userUid,
    name: user[0].name,
  };

  return result;
}

function logout(session) {
  return new Promise((resolve, reject) => {
    if (!session) {
      return resolve("세션이 없습니다.");
    }
    if (!session.user) {
      return resolve("이미 로그아웃 상태입니다.");
    }

    session.destroy((err) => {
      if (err) {
        return reject(err);
      }
      resolve("로그아웃 완료");
    });
  });
}

async function getAllDBLists() {
  const data = userModel.findAllDataBases();
  return data;
}

module.exports = { signup, login, logout, getAllDBLists };
