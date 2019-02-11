const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    shop_no: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    order_type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    cost_per_kg: {
        type: Number,
        required: true
    },
    buyer_name: {
        type: String,
        required: false
    },
    is_credit: {
        type: String,
        required: false
    },
    discount: {
        type: Number,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('Order', Order);