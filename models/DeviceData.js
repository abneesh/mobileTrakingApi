var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

var deviceSchema   = new mongoose.Schema({
    email: { type:  Schema.Types.String, required: true },
    imeiNo: { type:  Schema.Types.String, required: true },
    deviceName: { type:  Schema.Types.String, required: false }
});

module.exports = mongoose.model('DeviceData', deviceSchema,'DeviceData');