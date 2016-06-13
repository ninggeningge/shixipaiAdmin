var mongoose = require('mongoose');
var CompanySchema = require('../schemas/companys');
var Company = mongoose.model('Company', CompanySchema);
module.exports = Company;