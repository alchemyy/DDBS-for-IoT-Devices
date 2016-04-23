/**
 * Created by HOTDOG on 6/3/16.
 */
//引入events模块
var events = require('events');
//创建eventEmitter对象
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function GET_request(){

    console.log('GET Request detected,about to establish connection...\n');

    console.log('GET Connection Established\n');

    //触发send_data 事件
    eventEmitter.emit('GET_sendResponse');
}

//使用匿名函数绑定data_received事件
eventEmitter.on('GET_sendResponse',function(){
    ///....Action to send resources to user
    console.log('GET request has been responsed!\n');
});

//绑定GET及事件处理程序
eventEmitter.on('GET',connectHandler);

//触发GET事件
eventEmitter.emit('GET');

console.log('Program is completed!');
