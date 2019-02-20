var express = require('express');
var router = express.Router();

const auth = require("../config/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.user);
});

router.get('/dashboard', auth.ensureAuthenticated, (req, res) => {
  res.render('store/dashboard');
});

// router.get('/admin', auth.ensureAuthenticated, auth.isAdmin, (req, res) => {
//   res.render('store/dashboard');
// });

module.exports = router;
