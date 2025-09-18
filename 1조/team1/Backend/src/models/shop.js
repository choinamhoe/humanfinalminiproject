const { pool } = require("../db/pool");

async function findShop(indutyType, emdType, question) {
  const query = `
    SELECT DISTINCT  bsshNm as Title,  prdlstCn, rnAdres as Address, bsshTelno as TEL, laCrdnt as LAT, loCrdnt as LON
    FROM shops
    WHERE indutyType = ?
        AND emdType = ?
        AND prdlstCn LIKE ?;
    `;
  const [rows] = await pool.query(query, [
    indutyType,
    emdType,
    `%${question}%`,
  ]);
  return rows;
}

module.exports = { findShop };
