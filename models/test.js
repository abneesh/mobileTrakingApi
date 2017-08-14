// var MongoClient = require('mongodb').MongoClient;
// // var url = "mongodb://ok:ok@ds149481.mlab.com:49481/abneeshdb
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     db.collection('DeviceData').aggregate([
//         { $lookup:
//             {
//                 from: 'LatLongData',
//                 localField: 'imeiNo',
//                 foreignField: 'imei',
//                 as: 'deviceData'
//             }
//         },{ "$unwind": "$deviceData" }
//     ], function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         db.close();
//     });
//
// //, { $unwind: { path: "$deviceData", preserveNullAndEmptyArrays: true }}
// });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ok:ok@ds149481.mlab.com:49481/abneeshdb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.createCollection("customers", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
