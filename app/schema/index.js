const mongoose = require('mongoose');

var FitnessSchema = new mongoose.Schema({
    eventID: {
        type: String,
        required: true
    },
    eventID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    event_timestamp_ms: {
        type: Number,
        required: true
    },
    app_user_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price_in_purchased_currency: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    takehome_percentage: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('FitnessSchema',FitnessSchema);
