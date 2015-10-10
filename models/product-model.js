var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    code:{
        type: String,
        index:true,
        unique: true,
        required: true
    },
    // type:{
    //     type: String,
    //     index: true,
    //     validate: [
    //         function(v) { return v != null || v != ""; },
    //         "Required type"
    //     ],
    //     required: true
    // },
    // format:{
    //     type: String,
    //     validate: [
    //         function(v) { return v != null || v != ""; },
    //         "Required format"
    //     ],
    //     required: true
    // },
    // length: {
    //     type: String,
    //     index: true,
    //     validate: [
    //         function(v) { return v != null || v != ""; },
    //         "Required length"
    //     ],
    //     required: true
    // },
    salePrice:{
        type: Number,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required sale price"
        ],
        min: 30,
        max: 5000,
        required: true
    },
    status: {
        type: Boolean
    }
});


productSchema.pre('update', function (next) {
    // verify has had this customer existed invoice on createdDate yet
    // if existed ==> add new order
    // else ==> add new invoice
    console.log("=====pre save product begin=======");
    console.log("code=%s", this.code);
    mongoose.models['products'].findOne({"code": this.code}, '_id').exec(function(err, product) {
        if(err) {
            console.log(err);
        } 
        else {
            if(this._id != product._id){
                console.log("===== got existed product pre update return _id =======");
                self.invalidate("_id", product._id);
                next({_id: product._id});
            }
        }
        next();
    });
});


module.exports = mongoose.model('products', productSchema);