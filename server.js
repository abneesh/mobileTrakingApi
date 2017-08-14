/**
 * Created by abneeshdubey on 27/07/17.
 */
require('dotenv').config();
var mongodb=require('./config/database');
var User = require('./models/User');
var DeviceData = require('./models/DeviceData');
var LatLongData = require('./models/LatLongData');
const app = require('express')();
const routes=require('./routes');
const port=process.env.PORT||27017;


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/',routes);


app.listen(port, function(){
    console.log('app is listening on port',port)
})