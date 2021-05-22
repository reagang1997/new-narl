const router = require("express").Router();
const passport = require('../config/passport');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Driver = require('../models/Driver');
router.post("/signup", (req, res) => {
  console.log("user signup");
  console.log(req.body);
  const { email, password, username, guid } = req.body;

  if (guid.length < 17) {
    res.json({ error: 'GUID not valid' })
  }

  User.findOne({ username: username }, async (err, user) => {
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

router.get('/api/user/:guid', async (req, res) => {
  const found = await User.findOne({guid: req.params.guid});
  res.send(found);
})

router.put('/api/user/changeName/:guid', async (req, res) => {
  const changedUser = await User.findOneAndUpdate({guid: req.params.guid}, {$set: {username: req.body.username}});
  const changedDriver = await Driver.findOneAndUpdate({guid: req.params.guid}, {$set: {name: req.body.username}});
  res.send(changedUser);
})
router.put('/api/user/changeEmail/:guid', async (req, res) => {
  const changedUser = await User.findOneAndUpdate({guid: req.params.guid}, {$set: {email: req.body.email}});
  res.send(changedUser);
})

router.get('/fail', function (req, res) {
  res.json(req.flash());
});
router.get('/success', function (req, res) {
  res.json(req.user);
});

router.get('/api/user/:id', async (req, res) => {
  const found = await User.findOne({ _id: req.params.id });
  res.send(found);
})

router.get('/api/userEmail/:email', async (req, res) => {
  const found = await User.findOne({ email: req.params.email });
  res.send(found);
})

router.get('/api/sendForgotPasswordEmail/:guid', async (req, res) => {

  const user = await User.findOne({ guid: req.params.guid });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'NARacingLeague@gmail.com',
      pass: 'Mw209100!'
    }
  });

  const mailOptions = {
    from: 'rbgrunwald1997@gmail.com',
    to: user.email,
    subject: 'NARL Password Reset',
    html: `<a href='https://north-american-racing-league.herokuapp.com/passwordReset/${user.guid}'>Click here to reset password</a>`

  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  })

});

router.put('/api/changePassword', async (req, res) => {
  const found = await User.findOne({guid: req.body.guid}, async (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      console.log("creating new user");
      user.password = req.body.password;
      user.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    } else {
      
    }
  });
  
})

module.exports = router;
