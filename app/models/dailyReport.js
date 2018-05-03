'use strict'

let mongoose = require('mongoose');

let DailyReportSchema = new mongoose.Schema({
	employeeUm: String,
	
	date: Number,
	finished: String,
	unfinished: String,
	workHours: String,
})

let DailyReport = mongoose.model('DailyReport', DailyReportSchema);

module.exports = DailyReport;