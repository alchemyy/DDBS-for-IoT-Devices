/**
 * Created by HOTDOG on 14/3/16.
 */
'use strict';

//----------------GET REQUEST-------------------
//var http = require('http');
//var url = require('url');
//var util = require('util');
//
//http.createServer(function(req,res){
//    res.writeHead(200,{'Content-Type':'text/plain'});
//    res.end(util.inspect(url.parse(req.url,true)));
//}).listen(3000);

//----------------POST REQUEST--------------------
var http = require('http');
var querystring = require('querystring');
var util = require('util');    //定义了一个post变量，用于暂存请求体的信息
var os = require('os');
var path = require('path');
http.createServer(function(req,res){
    var post = '';
    req.on('data',function(chunk){  //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post +=chunk;
    });
    req.on('end',function(){
        post = querystring.parse(post);
        res.end('Post bodies:'+ util.inspect(post));
    });
}).listen(3000);
console.log('System Type:'+ os.type()+ os.release());
console.log('Resolve:'+ path.resolve('Get_Post.js'));
console.log('Ext name:'+ path.extname('Get_Post.js'));
//console.log(os.networkInterfaces());