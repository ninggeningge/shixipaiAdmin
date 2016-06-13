var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var InternsSchema = new Schema({
	title: String,
	start_time: Date,
	salary: String,
	area: String,
	education: String,
	time: String,
	term: String,
	kind: String,
	fascinate: String,
	info: String,
	end_time: Date,
	company: String,
	scope: String,
	scale: String,
	website: String,
	location: String,
	company_image: String,
	hr_mail: String,
	read: Number,
	delivery: Number,
	collect: Number,
	industry: String,
	source: String,
	cid: Number,
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	},
	location_map: String

});


InternsSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	next();
});

InternsSchema.statics = {
	fetch: function(page, pageSize, cb) {
		return this
			.find({})
			.sort('updateAt')
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.exec(cb);
	},
	findBy_Id: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb);
	},
};

module.exports = InternsSchema;