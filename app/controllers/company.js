var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

exports.create = function(req, res) {
	res.render('createCompany', {
		title: '添加公司信息',
		Company: {
			name: '',
			type: '',
			state: '',
			img: '',
			capacity: '',
			location: '',
			description: '',
			hrInfo: '',
		}
	});
}

exports.new = function(req, res) {
	var id = req.body.Company._id;
	var CompanyObj = req.body.Company;
	var _Company;

	if (req.file != null) {
		if (CompanyObj.img != null) {
			fs.unlinkSync('public/img/webImages/' + CompanyObj.img);
		}

		var originalFilenameArray = req.file.originalname.split('.');
		fs.renameSync('public/img/webImages/' + req.file.filename,
			'public/img/webImages/' + req.file.filename + '.' + originalFilenameArray[originalFilenameArray.length - 1]);
		CompanyObj.img = req.file.filename + '.' + originalFilenameArray[originalFilenameArray.length - 1];
	}


	if (id !== 'undefined') {
		Company.findById(id, function(err, Company) {
			if (err) {
				console.log(err);
			}
			_Company = _.extend(Company, CompanyObj);
			_Company.save(function(err, movie) {
				if (err) {
					console.log(err);
				}
				res.redirect('/company/list');
			});
		});
	} else {
		_Company = new Company({
			name: CompanyObj.name,
			type: CompanyObj.type,
			state: CompanyObj.state,
			img: CompanyObj.img,
			capacity: CompanyObj.capacity,
			location: CompanyObj.location,
			description: CompanyObj.description,
			hrInfo: CompanyObj.hrInfo,
		});
		_Company.save(function(err, Company) {
			if (err) {
				console.log(err)
			}

			res.redirect('/company/list')
		});


	}
}

exports.list = function(req, res) {
	var page = req.params.page;
	if (!page) {
		page = 1;
	}

	var pageSize = 10; //每页展示的数据数
	Company.count({}, function(err, count) {

		if (err) {
			console.log(err);
		}

		Company.fetch(page, pageSize, function(err, Companys) {
			if (err) {
				console.log(err);
			}
			res.render('companyList', {
				title: '公司列表',
				Companys: Companys,
				total: Math.ceil(count / pageSize),
				page: page
			});
		});

	})

}

exports.update = function(req, res) {
	var id = req.params.id;
	Company.findById(id, function(err, Company) {
		if (err) {
			console.log(err);
		}
		res.render('createCompany', {
			title: '更新公司',
			Company: Company
		})
	});
}


exports.delete = function(req, res) {
	var id = req.query.id;
	if (id) {

		Company.findById(id, function(err, Company) {
			if (err) {
				console.log(err);
			}

			fs.unlinkSync('public/img/webImages/' + Company.img);

			Company.remove({
				_id: id
			}, function(err, Company) {
				if (err) {
					console.log(err);
				} else {

					res.json({
						success: 1
					});
				}
			});
		});

	}

}