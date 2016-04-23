/**
 * Created by root on 3/24/16.
 */

'use strict';
var fs = require("fs");
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/db');

//
// var db = mongoose.connection;
var db = mongoose.createConnection('localhost','db'); //创建一个数据库连接
// //添加的新用户数据
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Mongodb opened!");
});
kitty.save(function (err) {
    if (err) // ...
        console.log('meow');
});