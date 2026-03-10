require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const userApi = require("./api/userApi");
const requestApi = require("./api/requestApi");
const assetApi = require("./api/assetApi");

const app = express();

app.use(express.json());

connectDB();

app.use("/users", userApi);
app.use("/requests", requestApi);
app.use("/assets", assetApi);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});