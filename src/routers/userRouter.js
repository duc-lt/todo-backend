const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { httpCode, SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const body = req.body;
  //
  //validate du lieu nguoi dugn day len
  const { error, value } = User.validate(body);
  if (error) {
    return res.status(httpCode.BAD_REQUEST).json({ msg: error.message });
  }
  // todo: ma hoa
  // thanh cong, insert database
  const old = await User.findOne({ username: value.username });
  if (old) {
    return res
      .status(httpCode.BAD_REQUEST)
      .json({ msg: "Da ton tai username " + value.username });
  }
  const user = new User(value);
  await user.save();
  res.status(httpCode.CREATED).json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }).select("-password");
  if (user) {
    const u = user.toObject();
    const token = jwt.sign(u, SECRET_KEY);
    return res.status(httpCode.SUCCESS).json({ token });
  }
  res.status(httpCode.BAD_REQUEST).json({ msg: "Tai khoan mat khau sai" });
});
module.exports = router;
