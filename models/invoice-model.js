var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    createdDate:{
        type: Date,
        index:true,
        unique: true,
        required: true
    },
    customer:{
        type: Schema.ObjectId,
        index: true,
        required: true
    },
    orders:[{
        product: Schema.ObjectId,
        price: {
            type: Number,
            min: 30,
            max: 5000,
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            max: 500000,
            required: true
        }
    }],
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model('invoices', invoiceSchema);