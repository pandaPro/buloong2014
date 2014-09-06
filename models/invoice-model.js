var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
var moment = require('moment');

// autoIncrement.initialize(db);

var invoiceSchema = new Schema({
    createdDate:{
        type: Date,
        required: true
    },
    customer:{
        id: {
            type: Schema.ObjectId,
            ref: 'customers',
            index: true,
            required: true
        }
    },
    orders:[{
        _id: false,
        id: {
            type: Schema.ObjectId,
            default: function () { return new mongoose.Types.ObjectId() }
        },
        code: {
            type: String,
            index: true,
            required: true
        },
        salePrice: {
            type: Number,
            min: 30,
            max: 50000,
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            max: 1000000,
            required: true
        }
    }],
    status: {
        type: Boolean
    }
});

invoiceSchema.pre('save', function (next) {
    var self = this;
    console.log("=====pre save invoice begin=======");
    var onDate = moment(self.createdDate).format('YYYY-MM-DD');
    console.log("onQueryDate=%s, customerId=%s", onDate, self.customer.id);
    mongoose.models['invoices'].find({"customer.id": self.customer.id}, '_id createdDate').limit(30).sort({createdDate: -1}).exec(function(err, invoices) {
        if(err) {
            console.log(err);
            next(err);
        } else if(invoices) {
            // console.log("invoice=" + invoices);
            for(i=0; i< invoices.length; i++){
                var invoiceId = invoices[i]._id;
                var createdDate = moment(invoices[i].createdDate).format('YYYY-MM-DD');
                // console.log("selected invoice date =%s", createdDate);
                if(createdDate == onDate){
                    console.log("===== got existed invoice pre save return _id =======");
                    self.invalidate("_id", invoiceId);
                    var error = new Error();
                    error.id = invoiceId;
                    next(error);
                    break;
                }
            }
        }
        next();
    });
});

// invoiceSchema.plugin(autoIncrement.plugin, {model: 'invoices', field: 'orders.id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model('invoices', invoiceSchema);