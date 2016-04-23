/**
 * Created by HOTDOG on 6/3/16.
 */
'use strict';

var http = require('http');
var url = require('url');

function start(route){
    function onRequest(request , response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+ pathname + "received");

        route(pathname);

        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("Hello I am"+pathname+"'s response");
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server started");
}
exports.start = start;