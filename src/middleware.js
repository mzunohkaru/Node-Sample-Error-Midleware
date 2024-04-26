
// HTTPメソッドをオーバーライドするカスタムミドルウェアの定義
function methodOverride() {
    return function (req, res, next) {
        console.log("DEBUG: methodOverride");
      // req.bodyが存在し、オブジェクト型であり、"_method"キーが含まれているかをチェック
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        let method = req.body._method;
        console.log("DEBUG: method", method);
        delete req.body._method;
        req.method = method; // リクエストメソッドを変更
        console.log("DEBUG: req.method", req.body);
        next(); // 次のミドルウェアへ処理を渡す
      } else {
        next();

      }
    };
  }

const FirstMiddleware = (req, res, next) => {
    console.log("DEBUG: FirstMiddleware");
    next();
  };
  
  // エラーハンドリングを改善するためのミドルウェア
  const SecondMiddleware = async (req, res, next) => {
    console.log("DEBUG: SecondMiddleware");
    try {
      // リクエストの検証など行う
  
      // エラーを発生させる
      throw new Error("SecondMiddleware");
  
      next(); // エラーがなければ次のミドルウェアへ
    } catch (e) {
      console.log("DEBUG: SecondMiddleware catch");
      // エラーが発生した場合、エラーオブジェクトを次のエラーハンドラへ渡す
      next(e);
    }
  };

const ThirdMiddleware = (req, res, next) => {
    console.log("DEBUG: ThirdMiddleware");
    next();
  };

module.exports = {
    methodOverride,
    FirstMiddleware,
    SecondMiddleware,
    ThirdMiddleware,
};

