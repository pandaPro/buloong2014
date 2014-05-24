var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id:{
        type: ObjectId,
    },
    code:{
        type: String,
        index:true,
        unique: true,
        required: true
    },
    type:{
        type: String,
        index: true,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required type"
        ],
        required: true
    },
    format:{
        type: String,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required format"
        ],
        required: true
    },
    length: {
        type: String,
        index: true,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required length"
        ],
        required: true
    },
    salePrice:{
        type: number,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required sale price"
        ],
        min: 30,
        max: 1000,
        required: true
    },
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model('products', productSchema);