var express = require('express');
var router = express.Router();

// Import the Model
const Buyer = require("../models/Buyer");


/* GET Buyer listing. */
router.get('/', function(req, res, next) {
  Buyer.find().then((foundBuyers) => {
    // res.json(foundBuyers);
    res.render("buyer/index", { foundBuyers });
  }).catch((err) => {
    throw err;
  });
});

router.get('/new', (req, res, next) => {
  res.render('buyer/new');
});

router.post('/', (req, res, next) => {
  const { buyer_name } = req.body;
    const newBuyer = new Buyer({
      buyer_name
    });
    console.log(newBuyer);
    newBuyer.save().then((savedBuyer) => {
      res.json(savedBuyer);
    }).catch((err) => {
      throw err;
    });
});

module.exports = router;
