/**
 * Created by HOTDOG on 6/3/16.
 */
'use strict';

var server = require("./server");
var router = require("./router");
server.start(router.route);

//console.log('byvoid%diovyb', 1991);