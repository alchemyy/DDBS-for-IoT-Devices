/**
 * Created by HOTDOG on 15/3/16.
 */

'use strict';
var express      = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/', function(req, res) {
    console.log("Cookies: ", req.cookies);
});

app.listen(8081);