/**
 * Created by abneeshdubey on 27/07/17.
 */

const routes = require('express').Router();
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/userDb";
var User = require('./models/User');// use user file with require parameter
// var User2 = mongoose.model('User');
var DeviceData = require('./models/DeviceData');
var LatLongData = require('./models/LatLongData');


routes.get('/',function (req,res) {
    res.json({message: "This is an server api system"});
});


routes.post('/login', function (req, res) {
    // console.log(req.body);
    User.findOne({email:req.body.email},function (err, user) {
        if(!err){
            if(user){
                if(user.password === req.body.password){
                    res.json(user);
                } else {
                    res.send("Invalid username or password!");
                }
            } else {
                res.send("User does not exists");
            }
        } else {
            res.send("Error while getting user from database", err);
        }
    })
})


routes.post('/signup', function (req, res) {
    User.findOne({email:req.body.email},function (err, user) {
        if(!err){
            if(user){
                res.send("User Allready Register!");
            } else {
                var user = new User(req.body);
                user.save(function (err, result) {
                    if(err){
                        res.send('Error while saving', err);
                    } else {
                        res.json(result);
                    }
                })
            }
        } else {
            res.send("Error while inserting user in database", err);
        }
    })


})

routes.post('/forgotPassword', function (req, res) {
    User.findOne({email:req.body.email},function (err, user) {
        if(!err){
            if(user){
                res.send(user.password);
            } else {
                res.send("User does not exists");
            }
        }
        else {
            res.send("Error while getting user from database", err);
        }
    })
})

routes.post('/adDevice', function (req, res) {
    DeviceData.findOne({imeiNo:req.body.imeiNo},function (err, device) {
        if(!err){
            if(device){
                res.status(201).json({message: "Device Allready Register with device name: "+device.deviceName});
            } else {
                var user = new DeviceData(req.body);
                user.save(function (err, result) {
                    if(err){
                        res.send('Error while add device', err);
                    } else {
                        res.status(200).json({message: "Device Register successfully !"});
                    }
                })
            }
        } else {
            res.send("Error while inserting Device in database", err);
        }
    })

})

// with login....
routes.post('/getDeviceList', function (req, res) {
    DeviceData.find({email:req.body.email},function (err, device) {
        if(!err){
            if(device){
                //.....
                res.status(200).json({message: device});
            } else {
                res.status(201).send("no device found");
            }
        } else {
            res.send("Error while getting user from database", err);
        }
    })
})

routes.post('/saveLatLong', function (req, res) {
    LatLongData.findOne({imeiNo:req.body.imeiNo},function (err, device) {
        if(!err){
            if(device){
                var myquery = { imeiNo: req.body.imeiNo };
                var newvalues = { $set: { lat: req.body.lat,long: req.body.long,time: req.body.time } };
                LatLongData.updateMany(myquery, newvalues, function(err, latlong) {
                    if (err) throw err;
                    // res.status(200).json("record updated");
                    // console.log("1 record updated");
                    // db.close();
                    res.status(200).json(latlong);
                })
            } else {
                var user = new LatLongData(req.body);
                user.save(function (err, result) {
                    if(err){
                        res.status(401).send('Error while saving', err);
                    } else {
                        res.status(200).json(result);
                    }
                })
            }
        } else {
            res.send("Error while inserting Device in database", err);
        }
    })
})

routes.post('/getLatLong', function (req, res) {
    LatLongData.findOne({imeiNo:req.body.imeiNo},function (err, user) {
        if(!err){
            if(user){
                res.status(200).send({message: user});
            } else {
                res.send({message: "no record found.."});
            }
        } else {
            res.status(401).send("Error while getting user from database", err);
        }
    })
})


// routes.post('/getDeviceList', function (req, res) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         db.collection('DeviceData').aggregate([
//             { $lookup:
//                 {
//                     from: 'LatLongData',
//                     localField: 'imeiNo',
//                     foreignField: 'imei',
//                     as: 'deviceData'
//                 }
//             },{ "$unwind": "$deviceData" }
//         ], function(err, result) {
//             if (err) throw err;
//             console.log(result);
//             res.send(result);
//             db.close();
//         });
//     });
// })

module.exports = routes;