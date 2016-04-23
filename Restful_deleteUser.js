/**
 * Created by HOTDOG on 15/3/16.
 */
'use stict';

var express = require('express');
var app = express();
var fs = require("fs");

//var id = 2;

app.get('/deleteUser:idnumber', function (req, res) {

    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + req.params.idnumber];

        console.log( data );
        res.end( JSON.stringify(data));
    });
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});