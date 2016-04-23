/**
 * Created by HOTDOG on 18/2/16.
 */
//var fs = require('fs');
//
//fs.readFile('/Users/HOTDOG/hello.txt',function(err,data){
//    if(err) return console.error(err);
//    console.log(data.toString());
//});
//
//console.log("\nProgram has been executed\n");

var counter1 = require('./counter');
var counter2 = require('./counter');

console.log(counter1.coq());
console.log(counter2.coq());
console.log(counter2.coq());