'use strict'

let mongoose = require('mongoose');

let ScheduleSchema = new mongoose.Schema({
	
	employeeUm: String,
	date: Number,
	
	items: [{
		startTime: Number,
		endTime: Number,
		todo:String
	}],
	
});

let Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;