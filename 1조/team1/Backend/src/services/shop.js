const shopModel = require("../models/shop");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKeys = process.env.GEMINI_API_KEYS.split(",").map((k) => k.trim());
const models = apiKeys.map((key) => {
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
});

let apiKeyIndex = 0;
async function findShop(indutyType, emdType, question) {
  apiKeyIndex = (apiKeyIndex + 1) % models.length;
  const model = models[apiKeyIndex];
  const rows = await shopModel.findShop(indutyType, emdType, question);
  const shopList = rows
    .map((r) => `${r.Title} (메뉴: ${r.prdlstCn})`)
    .join("\n");

  const prompt = `
    사용자가 질문: "${question}"
    다음은 DB에서 불러온 가게 리스트입니다:
    ${shopList}

    위 리스트를 기반으로 질문에 맞게 대답해주세요.
    `;
  const result = await model.generateContent(prompt);
  const message = result.response.text();
  return { message, rows };
}

module.exports = { findShop };
