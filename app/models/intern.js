var mongoose = require('mongoose');
var InternsSchema = require('../schemas/Interns');
var Intern = mongoose.model('Intern', InternsSchema);
module.exports = Intern;