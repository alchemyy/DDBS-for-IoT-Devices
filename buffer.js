/**
 * Created by HOTDOG on 6/3/16.
 */
'use strict';
//*************通过buffer打印字母************//
//var buf = new Buffer(26);
//for (var i=0 ; i<26 ;i++){
//    buf[i]=i+96;
//}
//
//console.log(buf.toString('ascii'));
//console.log(buf.toString('ascii',1,5));
//console.log(buf.toString('ascii',2,6));
//console.log(buf.toString('utf8',2,6));
//console.log(buf.toString(undefined,2,6));

//**********将buffer转换为JSON对象****************//
//var buf = new Buffer('www.baidu.com');
//var json= buf.toJSON(buf);
//
//console.log(json);

//**********缓冲区合并********************//
//var buffer1= new Buffer('菜鸟教程');
//var buffer2= new Buffer('www.runoob.com');
//var buffer3= Buffer.concat([buffer1,buffer2]);
//console.log("buffer3 内容:" + buffer3.toString());

//**********拷贝缓冲区****************//
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 内容:" + buffer2.toString());
