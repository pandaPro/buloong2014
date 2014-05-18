var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required"
        ],
        required: true
    },
    address: {
        type: String,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required"
        ],
        required: true
    },
    phone: {
        type: String
    },
    status: {
        type: Boolean
    }
});

var customerListSchema = new Schema({ list : [customerSchema] });
var listCustomers = mongoose.model('customerList', customerListSchema);

module.exports = mongoose.model('customers', customerSchema);