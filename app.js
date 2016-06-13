// 项目入口文件
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var fs = require('fs')
var path = require('path');
var _ = require('underscore');


//数据库地址
var dbUrl = 'mongodb://root:root@localhost/shixipai'
mongoose.connect(dbUrl)

// models loading
var models_path = __dirname + '/app/models'
var walk = function(path) {
	fs
		.readdirSync(path)
		.forEach(function(file) {
			var newPath = path + '/' + file
			var stat = fs.statSync(newPath)

			if (stat.isFile()) {
				if (/(.*)\.(js|coffee)/.test(file)) {
					require(newPath)
				}
			} else if (stat.isDirectory()) {
				walk(newPath)
			}
		})
}
walk(models_path)

// 静态资源请求路径
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
app.locals.moment = require('moment');


app.set('views', './app/views/pages');
app.set('view engine', 'jade');

// 静态资源请求路径
app.use(express.static(path.join(__dirname, 'public')));
// console.info('__dirname',__dirname,path.join(__dirname, 'bower_components'));

// 表单数据格式化
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('showStackError', true)
app.locals.pretty = true

require('./config/route')(app)

app.listen(3000);
console.log('success');