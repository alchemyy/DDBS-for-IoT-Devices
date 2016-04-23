/**
 * Created by HOTDOG on 21/4/16.
 */

'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var log = require('log');
var util = require('util');
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
var sensor_Schema = new Schema({
    dev_type : String,            //sensor: pm2.5 humid temp pressure smoke
    id: Number,
    location : String,
    temp : Number,
    humid: Number,
    notic: String,
    time: {
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        second: Number
    }
},{versionKey:false});

var frige_Schema = new Schema({
    dev_type : String,            //sensor: pm2.5 humid temp pressure smoke
    id: Number,
    location : String,
    cur_temp: Number,
    set_temp: Number,
    notice: String,
    time: {
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        second: Number
    }
},{versionKey:false});

var aircond_Schema = new Schema({
    dev_type : String,            //sensor: pm2.5 humid temp pressure smoke
    id: Number,
    location : String,
    cur_temp: Number,
    notice: String,
    time: {
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        second: Number
    }
},{versionKey:false});

var light_Schema = new Schema({
    dev_type : String,            //sensor: pm2.5 humid temp pressure smoke
    id: Number,
    location : String,
    light: Number,
    notice: String,
    time: {
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        second: Number
    }
},{versionKey:false});
var sensor_model = mongoose.model('sensor',sensor_Schema); //根据设备类型(req.body.dev_type)创建collection
var frige_model = mongoose.model('frige',frige_Schema);
var aircond_model = mongoose.model('aircond',aircond_Schema);
var light_model = mongoose.model('light',light_Schema);
//构建model

//***************************** GET METHOD *************************************
app.get('/:id', function (req, res) {       //列出所有设备、设备编号与设备地理位置
    if(req.params.id == 'collections'){
        //show all collections
        mongoose.connection.db.listCollections().toArray(function(err, names) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                // names.forEach(function(e,i,a) {
                //     mongoose.connection.db.dropCollection(e.name);
                console.log("--->>", names);
                // });
                res.send(names);
                // names.map(function(cname) {
                //     console.log(cname.name);
                // res.send(cname.name);});
            }
        });

    }else{
        console.log('list the mean value of this collection');
        res.send('list the mean value of this collection');
        //     var dev = req.params.id+'s';

    }
});
//***************************** POST METHOD *************************************
app.post('/rtd', function (req, res) {  //接收传感器上报的温湿度信息
    if (req.body) {
        //能正确解析 json 格式的post参数
        var json_data = req.body;//=JSON.parse(req.body);
        var type = req.body.dev_type;
        // var model = mongoose.model(type,type+"_Schema");
        // var RT_Data = new model(json_data);
        //     RT_Data.save(function(err){
        //         if(err){
        //             console.log(err);
        //             res.send(err);
        //         }else{
        //             console.log('Saved as JSON');
        //             res.send('Saved as JSON');
        //         }
        //     });
        if(type == 'sensor'){
            var RT_Data = new sensor_model(json_data);
            RT_Data.save(function(err){
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log('Saved as JSON');
                    res.send('Saved as JSON');
                }
            });
        }else if(type == 'frige' ){
            var RT_Data = new frige_model(json_data);
            RT_Data.save(function(err){
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log('Saved as JSON');
                    res.send('Saved as JSON');
                }
            });
        }else if(type == 'aircond'){
            var RT_Data = new aircond_model(json_data);
            RT_Data.save(function(err){
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log('Saved as JSON');
                    res.send('Saved as JSON');
                }
            });
        }else if(type == 'light'){
            var RT_Data = new light_model(json_data);
            RT_Data.save(function(err){
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log('Saved as JSON');
                    res.send('Saved as JSON');
                }
            });
        }
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
            //console.log('JSON RECEIVED AS Stream');
            //console.log(jsonStr);
            var rtd = mongoose.model('rtd',rtd_Schema);//
            var RT_Data = new rtd(jsonStr);
            RT_Data.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('The new RT_Data was saved');
                }
            });
        });
    }
});

//app.del('/delete:id',function(req,res){  //删除指定id的数据 用法:delete3 (或者删除指定时间?指定设备?)
//
//    RT_Data.save(function(err){
//        if(err){
//            console.log(err);
//        }else{
//            console.log('The new RT_Data was saved');
//        }
//    });
//});

// app.post('/dev/:id',function(req,res){  //添加设备号至设备列表(设备注册) mongo中专门设一个collection用于存放设备信息
//
// });


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});
