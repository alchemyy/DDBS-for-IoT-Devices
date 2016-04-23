
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var log = require('log');
var app = express();
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
// var server = require('http').createServer(app);
var fs = require("fs");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
// var express = require('express');
// var app = express();
//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Mongodb opened!");
});
var Schema = mongoose.Schema;

//声明Schema
var rtd_Schema = new Schema({
    dev_type : String,
    id: Number,
    location : String,
    temp : Number,
    humid: Number
},{versionKey:false});
// new mongoose.Schema(req.body)
//构建model

//简单的数据交互
//创建两个实例
app.post('/post', function (req, res) {
    if (req.body.data) {
        //能正确解析 json 格式的post参数
        res.send('JSON RECEIVED');
        console.log('JSON RECEIVED');
    } else {
        //不能正确解析json 格式的post参数
        var body = '', jsonStr;
        req.on('data', function (chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function () {
            //读取参数流结束后将转化的body字符串解析成 JSON 格式
            try {
                jsonStr = JSON.parse(body);
            } catch (err) {
                jsonStr = null;
            }
            jsonStr ? res.send('JSON RECEIVED AS Stream') : res.send({"status": "error"});
            console.log('JSON RECEIVED AS Stream');
            //console.log(jsonStr);
            var rtd = mongoose.model('rtd',rtd_Schema);
            var RT_Data = new rtd(jsonStr);
            RT_Data.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('The new RT_Data was saved');
                }
            });
            // jsonStr.save(function (err) {
            //     if (!err) {
            //         log.info("jsonStr created");
            //         return res.send({status: 'OK'});
            //     } else {
            //         console.log(err);
            //         if (err.name == 'ValidationError') {
            //             res.statusCode = 400;
            //             res.send({error: 'Validation error'});
            //         } else {
            //             res.statusCode = 500;
            //             res.send({error: 'Server error'});
            //         }
            //         log.error('Internal error(%d): %s', res.statusCode, err.message);
            //     }
            // });
        });
    }
});
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});