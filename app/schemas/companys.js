var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
	name: String,
	type: String,
	state: String,
	img: String,
	capacity: String,
	location: String,
	description: String,
	hrInfo: String,
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	}

});

CompanySchema.pre('save', function(next) {
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	next();
});

CompanySchema.statics = {
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

module.exports = CompanySchema;