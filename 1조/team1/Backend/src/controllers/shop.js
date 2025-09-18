const shopService = require("../services/shop");

async function findShop(req, res) {
  const { question, indutyType, emdType } = req.body;
  console.log(" question, indutyType, emdType", question, indutyType, emdType);
  try {
    const { message, rows } = await shopService.findShop(
      indutyType,
      emdType,
      question
    );
    return res.status(200).json({ message: message, data: rows });
  } catch (err) {
    if (err.status == 429) {
      return res.status(429).json({ message: err });
    }
    return res.status(500).json({ message: err });
  }
}

module.exports = { findShop };
