/**
 * Created by root on 3/24/16.
 */
'use strict';

var express = require('express');
var app = express();
var fs = require("fs");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// var express = require('express');
// var app = express();
//

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Mongodb opened!");
});
// var user = {
//     "user4" : {
//         "name" : "mohit",
//         "password" : "password4",
//         "profession" : "teacher",
//         "id": 4
//     }
// };
app.get('/api/realT_data', function(req, res) {
    return ArticleModel.find(function (err, realT_data) {
        if (!err) {
            return res.send(realT_data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/api/realT_data', function(req, res) {
    var realt_data
        = new ArticleModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    article.save(function (err) {
        if (!err) {
            log.info("realT_data created");
            return res.send({ status: 'OK', article:article });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

app.get('/api/realT_data/:id', function(req, res) {
    return ArticleModel.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', article:article });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/api/realT_data/:id', function (req, res){
    return ArticleModel.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        article.title = req.body.title;
        article.description = req.body.description;
        article.author = req.body.author;
        article.images = req.body.images;
        return article.save(function (err) {
            if (!err) {
                log.info("article updated");
                return res.send({ status: 'OK', article:article });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

app.delete('/api/realT_data/:id', function (req, res){
    return ArticleModel.findById(req.params.id, function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return article.remove(function (err) {
            if (!err) {
                log.info("article removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});
app.get('/update', function (req, res) {
    // 读取已存在的数据
    fs.readFile( __dirname + "/" + "RealT_Dat_Set.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
    });
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

// app.use(express.static('public'));
// //  主页输出 "Hello World"
// app.get('/', function (req, res) {
//     console.log("主页 GET 请求");
//     res.send('Hello GET');
// });


////  POST 请求
//app.post('/', function (req, res) {
//    console.log("主页 POST 请求");
//    res.send('Hello POST');
//});
//
////  /del_user 页面响应
//app.delete('/del_user', function (req, res) {
//    console.log("/del_user 响应 DELETE 请求");
//    res.send('删除页面');
//});
//
////  /list_user 页面 GET 请求
//app.get('/list_user', function (req, res) {
//    console.log("/list_user GET 请求");
//    res.send('用户列表页面');
//});
//
//// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
//app.get('/ab*cd', function(req, res) {
//    console.log("/ab*cd GET 请求");
//    res.send('正则匹配');
//});
