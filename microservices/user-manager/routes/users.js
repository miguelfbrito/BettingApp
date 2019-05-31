var express = require('express');
var router = express.Router();
const User = require('../models/user')

router.get('/', async (req, res, next) => {
  console.log("Creating user!")
  let user = await User.create({ username: "mbrito", password: "pass" });
  res.json(user)
});

router.get('/test', async (req, res, next) => {
  res.json({ "teste": "This is a test" })
});

module.exports = router;
