const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { corsMiddleware, cookieMiddleware } = require("./src/middlewares");
const shopRoutes = require("./src/routes/shop");
const app = express();
require("dotenv").config();

app.use(corsMiddleware);
app.use(cookieMiddleware);
app.use(express.json({ limit: "50mb" }));
app.use("/", shopRoutes);
// app.use("/user", userRoutes);

const PORT = require("./src/config").BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
