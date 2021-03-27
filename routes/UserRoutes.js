const router = require("express").Router();
const passport = require('../config/passport');

router.post("/signup", (req, res) => {
  console.log("user signup");
  console.log(req.body);
  const { email, password, username } = req.body;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      console.log("creating new user");
      const newUser = new User({
        username: username,
        password: password,
        email: email
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});