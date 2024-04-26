const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const {
    methodOverride,
  FirstMiddleware,
  SecondMiddleware,
  ThirdMiddleware,
} = require("./middleware");

const app = express();
const port = process.env.PORT || 3000;

// URLエンコードされたボディを解析するためのミドルウェアを設定
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// JSON形式のボディを解析するためのミドルウェアを設定
app.use(bodyParser.json());


// カスタムメソッドオーバーライドミドルウェアを使用
app.use(methodOverride());

app.get(
  "/err",
  FirstMiddleware,
  SecondMiddleware,
  ThirdMiddleware,
  (req, res) => {
    console.log("DEBUG: /err Endpoint");
    res.send("err");
  }
);

app.post(
  "/err",
  (req, res) => {
    res.send(req.body);
  }
);

// エラーハンドリングのミドルウェア
app.use((err, req, res, next) => {
  console.log("DEBUG: Error Handler");
  console.error(err); // エラーをコンソールに出力
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send({ error: message });
});

app.listen(port, () => {
  console.log(`Server is running!🚀 http://localhost:${port}`);
});
