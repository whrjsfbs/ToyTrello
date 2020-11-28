/* eslint-disable */
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../dist")));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`서버가 구동되었습니다. localhost:${port}`);
});
