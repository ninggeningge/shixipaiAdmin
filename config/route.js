var Intern = require('../app/controllers/intern')
var Company = require('../app/controllers/company')
var multer = require('multer');
var upload = multer({
	dest: './public/img/webImages'
})

module.exports = function(app) {

	//实习管理
	app.get('/intern/create', Intern.create);
	app.post('/intern/new', Intern.new);
	app.get('/intern/list/:page', Intern.list);
	app.get('/intern/list', function(req, res) {
		res.redirect('/intern/list/1');
	});
	app.get('/intern/update/:id', Intern.update);
	app.delete('/intern/list', Intern.delete);


	//公司管理
	app.get('/company/create', Company.create);
	app.post('/company/new', upload.single('img'), Company.new);
	app.get('/company/list/:page', Company.list);
	app.get('/company/list', function(req, res) {
		res.redirect('/company/list/1');
	});
	app.get('/company/update/:id', Company.update);
	app.delete('/company/list', Company.delete);

}