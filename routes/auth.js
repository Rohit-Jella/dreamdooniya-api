const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { signup, login } = require("../validations");
const bcrypt = require("bcryptjs");

//registration
router.post("/register", async (req, res) => {
  const { error } = signup(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists..");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.send(error);
  }
});

//login
router.post("/login", async (req, res) => {
  const { error } = login(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does't exists");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.TokenSecret, {expiresIn:"1m"} );
  res.header("auth-token", token).send(token);
});
module.exports = router;
