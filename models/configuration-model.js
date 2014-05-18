var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var configurationSchema = new Schema({
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
    value: {
        type: String,
        validate: [
            function(v) { return v != null || v != ""; },
            "Required"
        ],
        required: true
    },
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model('config', configurationSchema);