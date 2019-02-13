const mongoose = require("mongoose");

const Buyer = new mongoose.Schema({
    buyer_name: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = mongoose.model('Buyer', Buyer);