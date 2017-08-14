/**
 * Created by abneeshdubey on 27/07/17.
 */
var mongoose = require('mongoose');
var config = require('./index').database;
mongoose.Promise = global.Promise;

var option={
    user:'',
    password:''
}

mongoose.connection.on('open',function () {
    console.log('connected to mongodb');
})
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server');
    console.log(err)
});
mongoose.connect(config.host);
//mongoose.connect('mongodb://abneesh:abneesh@123@ds129183.mlab.com:29183/user_mobile_db');