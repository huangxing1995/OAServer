'use strict'

let mongoose = require('mongoose');

let BusinessTripSchema = new mongoose.Schema({
	employeeUm: String,
	
	destination: String,
	reason: String,
	startTime: Number,
	endTime: Number,
	
	approverUm: [String], // 所有审批人员列表
	currentApproverUm: String, // 当前审批人
	rejectReason: String,
	approveStatus: String, // Y,N,D
})

let BusinessTrip = mongoose.model('BusinessTrip', BusinessTripSchema);

module.exports = BusinessTrip;