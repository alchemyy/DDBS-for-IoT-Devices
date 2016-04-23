/**
 * Created by HOTDOG on 5/3/16.
 */
'use strict' ;

var fs= require('fs');

fs.readFile('my-school.txt','utf-8',function(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})
