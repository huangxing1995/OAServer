'use strict'

let mongoose = require('mongoose');

let WeeklyReportSchema = new mongoose.Schema({
	employeeUm: String,
	
	date:[Number],
	
	summary: String,
	goal: String,
});

let WeeklyReport = mongoose.model('WeeklyReport', WeeklyReportSchema);

module.exports = WeeklyReport;