var express = require('express');
var router = express.Router();

const auth = require("../config/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.user);
});

router.get('/dashboard', auth.ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    username: req.user.username,
    is_admin: req.user.is_admin,
    id: req.user._id
  });
});

router.get('/admin', auth.ensureAuthenticated, auth.isAdmin, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
