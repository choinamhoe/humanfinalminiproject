const pool = require("../db/pool");

async function findByUserUid(userUid) {
  const rows = await pool.query("SELECT * FROM users WHERE userUid = ?", [
    userUid,
  ]);
  return rows;
}

async function createUser(userUid, hashedPassword, name, phoneNumber) {
  await pool.query(
    "INSERT INTO users (userUid, password, name, phoneNumber, createAt) VALUES (?, ?, ?, ?, NOW())",
    [userUid, hashedPassword, name, phoneNumber]
  );
}

async function findAllDataBases(userUid, hashedPassword, name, phoneNumber) {
  const rows = await pool.query("SHOW DATABASES;");
  return rows;
}

module.exports = { findByUserUid, createUser, findAllDataBases };
