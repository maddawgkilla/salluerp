var express = require('express');
var router = express.Router();

// Import the Model
const Order = require("../models/Order");


/* GET users listing. */
router.get('/', function(req, res, next) {
  Order.find().then((foundUsers) => {
    res.json(foundUsers);
  }).catch((err) => {
    throw err;
  });
});

router.get('/new', (req, res, next) => {
  res.render('order/new');
});

router.post('/', (req, res, next) => {
  // res.json(req);
  // console.log(req.body);
  const { shopNo, weight, orderType, cost, costPerKg, buyer, is_credit, discount } = req.body;
  if(orderType == 'retail') {
    const newOrder = new Order({
      shopNo,
      weight,
      orderType,
      cost,
      costPerKg
    });
    newOrder.save().then((savedOrder) => {
      res.json(savedOrder);
    }).catch((err) => {
      throw err;
    });
  } else {
    const newOrder = new Order({
      shopNo,
      weight,
      orderType,
      cost,
      costPerKg,
      buyer,
      is_credit,
      discount
    });
    newOrder.save().then((savedOrder) => {
      res.json(savedOrder);
    }).catch((err) => {
      throw err;
    });
  }
});

module.exports = router;
