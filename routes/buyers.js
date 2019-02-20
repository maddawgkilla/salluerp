var express = require('express');
var router = express.Router();

const auth = require("../config/auth");

// Import the Model
const Buyer = require("../models/Buyer");
const Order = require("../models/Order");


/* GET Buyer listing. */
router.get('/', auth.ensureAuthenticated, function(req, res, next) {
  Buyer.find().then((foundBuyers) => {
    // res.json(foundBuyers);
    res.render("buyer/index", { foundBuyers });
  }).catch((err) => {
    throw err;
  });
});

router.get('/:buyer_name', (req, res) => {
  const { buyer_name } = req.params;
  console.log(buyer_name);
  Buyer.findOne().where('buyer_name').equals(buyer_name).then((buyer) => {
    if(buyer) {
      Order.find().where('buyer_name').equals(buyer_name).then((orders) => {
        // if(orders) {
          res.render('buyer/orders', {orders});
        // } else {
        // console.log(orders);
        // }
      }).catch((err) => {
        throw err;
      });
    } else {
      res.send("The Buyer Does not Exist");
    }
  }).catch((err) => {
    throw err;
  });
});

router.get('/new', auth.ensureAuthenticated, auth.isAdmin, (req, res, next) => {
  res.render('buyer/new');
});

router.post('/', auth.ensureAuthenticated, auth.isAdmin, (req, res, next) => {
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
