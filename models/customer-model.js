var mongoose = require('mongoose');
var validate = require('mongoose-validator').validate;
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        trim: true,
        validate: validate('len', 1, 30),
        required: true
    },
    address: {
        type: String,
        maxlength: 150
    },
    phone: {
        type: String,
        required: false
    },
    discount:{
        type: Number,
        min: 0,
        max: 5
    },
    status: {
        type: Boolean
    }
});

var customerListSchema = new Schema({ list : [customerSchema] });

module.exports = mongoose.model('customers', customerSchema);