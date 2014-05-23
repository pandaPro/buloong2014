var mongoose = require('mongoose');
var validate = require('mongoose-validator').validate;
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        validate: validate('len', 1, 30),
        required: true
    },
    address: {
        type: String,
        maxlength: 100
    },
    phone: {
        validate: validate('len', 8, 30),
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }
});

var customerListSchema = new Schema({ list : [customerSchema] });
var listCustomers = mongoose.model('customerList', customerListSchema);

module.exports = mongoose.model('customers', customerSchema);