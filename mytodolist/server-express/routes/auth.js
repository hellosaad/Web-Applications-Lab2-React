const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
const saltRounds = 10;

router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    res.status(400).json({ error: "Passwords not matching" });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

module.exports = router;
