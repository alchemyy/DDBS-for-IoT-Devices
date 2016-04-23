/**
 * Created by HOTDOG on 6/3/16.
 */
'use strict';
//******************链式流******************//
var fs = require('fs');
var zlib = require('zlib');

   //*********压缩my-school.txt 文件为 my-school.txt.gz******//
   //fs.createReadStream('my-school.txt')
   //    .pipe(zlib.createGzip())
   //    .pipe(fs.createWriteStream('my-school.txt.gz'));
   //
   //console.log("文件压缩完成");

   //*********解压缩my-school.txt.gz文件为my-school_decompressed.txt******//
   fs.createReadStream('my-school.txt.gz')
       .pipe(zlib.createGunzip())
       .pipe(fs.createWriteStream('my-school_decompressed.txt'));
   console.log('文件解压缩完成');
//**********************创建读取流******************//
//var fs = require('fs');
//var data = '';
//
////创建可读流
//var readerStream = fs.createReadStream('my-school.txt');
//
////设置编码UTF-8
//readerStream.setEncoding('UTF8');
//
////处理流事件 -->data, end , and error
//readerStream.on('data',function(chunk){
//    data += chunk;
//});
//
//readerStream.on('end',function(){
//    console.log(data);
//});
//
//readerStream.on('error',function(err){
//    console.log(err.stack);
//});
//
//console.log("Program completed");


//*********************创建写入流**********************//
//var fs = require('fs');
//var data = '菜鸟教程: www.runoob.com';
//
////创建一个可以写入的流,写入到文件 stream-output.txt
//var writerStream = fs.createWriteStream('stream-output.txt');
//
////使用UTF8编码写入数据
//writerStream.write(data,'UTF8');
//
////标记文件末尾
//writerStream.end();
//
////处理流事件 ——->data ,end, and error
//writerStream.on('finish',function(){
//    console.log('Write process completed!');
//});
//
//writerStream.on('error',function(err){
//    console.log(err.stack);
//});
//
//console.log('Program completed!');

//************管道流********************//
//var fs = require('fs');
//
////创建可读流
//var readerStream = fs.createReadStream('my-school.txt');
//
////创建可写流
//var writerStream = fs.createWriteStream('stream-output.txt');
//
////管道读写操作
//readerStream.pipe(writerStream);
//
//console.log('Program completed');

