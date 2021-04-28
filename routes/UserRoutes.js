const router = require("express").Router();
const passport = require('../config/passport');
const User = require('../models/User');

router.post("/signup", (req, res) => {
  console.log("user signup");
  console.log(req.body);
  const { email, password, username, guid } = req.body;

  if(guid.length < 17 ){
    res.json({error: 'GUID not valid'})
  }

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
        email: email,
        guid: guid
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/fail',
  failureFlash: true,
  successFlash: true
}));

router.get('/fail', function(req, res) {
  res.json(req.flash());
});
router.get('/success', function(req, res) {
  res.json(req.user);
});

router.get('/api/user/:id', async (req, res) => {
  const found = await User.findOne({_id: req.params.id});
  res.send(found);
})

module.exports = router;
