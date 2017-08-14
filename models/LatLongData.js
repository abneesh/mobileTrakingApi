var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

var latlongSchema   = new mongoose.Schema({
    imeiNo: { type:  Schema.Types.String, required: true },
    lat: { type:  Schema.Types.String, required: true },
    long: { type:  Schema.Types.String, required: true },
    time: { type:  Schema.Types.String, required: false }
});

module.exports = mongoose.model('LatLongData', latlongSchema,'LatLongData');