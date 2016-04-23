/**
 * Created by HOTDOG on 6/3/16.
 */
'use strict';
//**********Nodejs函数传递****************//
function execute(someFunction , value){
    someFunction(value);
};
//***********匿名函数****************//
execute(function(words){console.log(words)},'xiaohaizi');