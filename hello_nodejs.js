/**
 * Created by HOTDOG on 18/2/16.
 */

'use strict';
var http = require('http');
exports.hello = function(){
    console.log('Hello World');
};
http.createServer(function (request, response){
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    //发送HTTP头部
    //HTTP状态值:200 :OK
    //内容类型:text/plain
    //response.writeHead(200,{'Content-type':'text/plain'});
    response.writeHead(200,{'Content-type':'text/plain'});
    //发送响应数据"Hello World"
//    response.end('Hello World \n--by alchemist'); //对应text/plain
    response.end('helloworld');
}).listen(8888);

//终端打印如下信息
console.log('Server Running at http://127.0.0.1:8888/');

