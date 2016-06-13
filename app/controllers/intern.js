var mongoose = require('mongoose');
var Intern = mongoose.model('Intern');
var _ = require('underscore');

exports.create = function(req, res) {
	res.render('create', {
		title: '添加实习信息',
		Intern: {
			title: '',
			start_time: '',
			salary: '',
			area: '',
			education: '',
			time: '',
			term: '',
			kind: '',
			fascinate: '',
			info: '',
			end_time: '',
			company: '',
			scope: '',
			scale: '',
			website: '',
			location: '',
			company_image: '',
			hr_mail: '',
			read: '',
			delivery: '',
			collect: '',
			industry: '',
			source: '',
			cid: '',
			location_map: ''
		}
	});
}

exports.new = function(req, res) {
	var id = req.body.Intern._id;
	var InternObj = req.body.Intern;
	var _Intern;
	//console.log(id !== 'undefined');
	if (id !== 'undefined') {
		Intern.findById(id, function(err, Intern) {
			if (err) {
				console.log(err);
			}
			_Intern = _.extend(Intern, InternObj);
			_Intern.save(function(err, movie) {
				if (err) {
					console.log(err);
				}
				res.redirect('/intern/list');
			});
		});
	} else {
		_Intern = new Intern({
			title: InternObj.title,
			start_time: InternObj.start_time,
			salary: InternObj.salary,
			area: InternObj.area,
			education: InternObj.education,
			time: InternObj.time,
			term: InternObj.term,
			kind: InternObj.kind,
			fascinate: InternObj.fascinate,
			info: InternObj.info,
			end_time: InternObj.end_time,
			company: InternObj.company,
			scope: InternObj.scope,
			scale: InternObj.scale,
			website: InternObj.website,
			location: InternObj.location,
			company_image: InternObj.company_image,
			hr_mail: InternObj.hr_mail,
			read: 0,
			delivery: 0,
			collect: 0,
			industry: InternObj.industry,
			source: InternObj.source,
			cid: InternObj.cid,
			location_map: InternObj.location_map
		});
		_Intern.save(function(err, Intern) {
			if (err) {
				console.log(err)
			}

			res.redirect('/intern/list')
		});


	}
}

//实习列表
exports.list = function(req, res) {
	var page = req.params.page;
	if (!page) {
		page = 1;
	}

	var pageSize = 10; //每页展示的数据数
	Intern.count({}, function(err, count) {

		if (err) {
			console.log(err);
		}

		Intern.fetch(page, pageSize, function(err, Interns) {
			if (err) {
				console.log(err);
			}
			res.render('list', {
				title: '实习列表',
				Interns: Interns,
				total: count,
				page: page
			});
		});

	})

}

//更新实习信息
exports.update = function(req, res) {
	var id = req.params.id;
	Intern.findById(id, function(err, Intern) {
		if (err) {
			console.log(err);
		}
		res.render('create', {
			title: '更新实习',
			Intern: Intern
		})
	});
}

//删除实习信息
exports.delete = function(req, res) {
	var id = req.query.id;
	if (id) {
		Intern.remove({
			_id: id
		}, function(err, Intern) {
			if (err) {
				console.log(err);
			} else {
				res.json({
					success: 1
				});
			}
		});
	}

}