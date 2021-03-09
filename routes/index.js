var express = require('express');
var router = express.Router();
var signupControllers = require('../controller/auth');
var emailControllers = require('../controller/send_contact_email');
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.session);
    if (true) {

    }
    else {
      res.redirect('/dashboard');
    }
  } else {
    next();
  }
};
const { check, validationResult } = require("express-validator");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/help', function (req, res, next) {
  res.render('help');
});
router.get('/package', function (req, res, next) {
  res.render('packages');
});
router.get('/purchase', function (req, res, next) {

  res.render('purchase');
});

router.post('/signup_completion', signupControllers.signup);
router.post('/login_completion', signupControllers.login);
router.post('/send_email',emailControllers.send);

router.get('/counter', function (req, res, next) {
  res.render('countdown');
});
router.get('/notice', function (req, res, next) {
  res.render('notice');
});

router.get('/profile/:email/:username', function (req, res, next) {
  console.log(req.params.id );
  res.render('profile', { email: req.params.email,username:req.params.username});
});

router.get('/vendorpurchase/:email/:username/:id', function (req, res, next) {
  console.log(req.params.id );
  res.render('vendorpurchase', { plan: req.params.id,email: req.params.email,username:req.params.username});
});
router.get('/dashboard/:email/:username', function (req, res, next) {
  res.render('dash',{ email: req.params.email,username:req.params.username});
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');

});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});

router.get('/nut', function (req, res, next) {
  res.render('nuts');
});
router.get('/notice', function (req, res, next) {
  res.render('notice');
});

module.exports = router;
