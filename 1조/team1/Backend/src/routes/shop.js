const express = require("express");
const router = express.Router();
const controller = require("../controllers/shop");

router.post("/ask", controller.findShop);
module.exports = router;
