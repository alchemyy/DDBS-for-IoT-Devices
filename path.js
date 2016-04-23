/**
 * Created by HOTDOG on 5/3/16.
 */
var cache = {};
var path=require('path').sep;
function store(key,value){
    //path.replace(/\\/g,'/');
    //var path1=path.normalize(key);
   // cache[path1.replace(/\\/g, '/')]= value;
    cache[path.normalize(key)]=value;
}
store('foo/bar',1);
store('foo\\bz\\..\\bar',2);
console.log(cache);