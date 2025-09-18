const userService = require("../services/user");

async function login(req, res) {
  const { userUid, password } = req.body;
  if (!userUid || !password)
    return res.status(400).json({ error: "이메일과 비밀번호가 필요합니다." });

  try {
    const data = await userService.login(userUid, password);
    req.session.user = data;
    console.log(req.session);
    return res.json({ message: "로그인 성공", data: req.session.user });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

async function logout(req, res) {
  try {
    const message = await userService.logout(req.session);
    if (message === "로그아웃 완료") {
      res.clearCookie("connect.sid");
      return res.status(200).json({ message });
    }
    return res.status(400).json({ message });
  } catch (err) {
    res.status(500).json({ error: "로그아웃 중 오류가 발생했습니다." });
  }
}
async function signup(req, res) {
  try {
    const { userUid, password, name, mobile } = req.body;
    const result = await userService.signup(userUid, password, name, mobile);
    res.status(201).json({ message: "회원가입성공", data: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { login, logout, signup };
