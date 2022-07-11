const { SECRET_KEY, httpCode } = require("../config");
const jwt = require("jsonwebtoken");

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
async function requireLogin(req, res, next) {
  const token = req.headers["x-access-token"];
  if (token) {
    const user = await verifyToken(token);
    req.user = user;
    return next();
  }
  res.status(httpCode.FORBIDDEN).json({ msg: "khong co quyen" });
}

module.exports = { requireLogin };
