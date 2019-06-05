var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");

var index = require('./routes/index');
var artic = require('./routes/artic');
var user = require('./routes/user');
var userpost = require('./routes/userpost');
var space = require('./routes/advertisingSpacea');
var chnnel = require('./routes/chnnel');
var message = require('./routes/message');
var multer = require('./routes/multer');


var socket = require('./routes/socket');
// var pool = require('./common/sqlconfig')
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/artic', artic);
app.use('/user', user);
app.use('/userpost', userpost);
app.use('/advertisingSpacea', space);
app.use('/chnnel', chnnel);
app.use('/message', message)
app.use('/multer', multer)



app.get('/routes/upload/*', function (req, res) {
    let file_path = __dirname + "/" + req.url;
 
    fs.readFile(file_path, 'binary', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            //console.log(data);
            console.log("输出文件");
            //不加这句，页面可能会乱码，图片包含中文也会乱码
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            res.write(data, 'binary');
            res.end();
        }
    })
})
 
// app.use('/api/system', system);


app.listen(3303, function () {
    console.log('端口3303服务已启动')
})

module.exports = app;
