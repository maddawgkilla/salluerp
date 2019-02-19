var express = require('express');
var router = express.Router();

// Import the Model
const Order = require("../models/Order");
const Buyer = require("../models/Buyer");


/* GET users listing. */
router.get('/', function(req, res, next) {
  Order.find().then((foundOrders) => {
    // res.json(foundOrders);
    res.render('order/index', {orders: foundOrders});
  }).catch((err) => {
    throw err;
  });
});

router.get('/new', (req, res, next) => {
  Buyer.find().then((foundBuyers) => {
    res.render('order/new', {
      foundBuyers
    });
  }).catch((err) => {
    throw err;
  });
});

router.post('/', (req, res, next) => {
  // res.json(req);
  console.log(req.body);
  const { shopNo, weight, orderType, cost, costPerKg, buyer, is_credit, discount } = req.body;
  if(orderType == 'retail') {
    const newOrder = new Order({
      shop_no: shopNo,
      weight,
      order_type: orderType,
      cost,
      cost_per_kg: costPerKg
    });
    newOrder.save().then((savedOrder) => {
      res.json(savedOrder);
    }).catch((err) => {
      throw err;
    });
  } else {
    if (!discount) {
      console.log("no discount");
      const newOrder = new Order({
        shop_no: shopNo,
        weight,
        order_type: orderType,
        cost,
        cost_per_kg: costPerKg,
        buyer_name: buyer,
        is_credit,
        discount
      });
      newOrder.save().then((savedOrder) => {
        res.json(savedOrder);
      }).catch((err) => {
        throw err;
      });
    } else {
      console.log("There is a disount");
      const discounted_cost = cost - (cost * (discount/100));
      const newOrder = new Order({
        shop_no: shopNo,
        weight,
        order_type: orderType,
        cost: discounted_cost,
        cost_per_kg: costPerKg,
        buyer_name: buyer,
        is_credit,
        discount
      });
      newOrder.save().then((savedOrder) => {
        res.json(savedOrder);
      }).catch((err) => {
        throw err;
      });
    }
  }
});

module.exports = router;
