'use strict'

let mongoose = require('mongoose');

let OverTimeSchema = new mongoose.Schema({
	employeeUm: String,
	
	reason: String,
	startTime: Number,
	endTime: Number,
	
	approverUm: [String], // 所有审批人员列表
	currentApproverUm: String, // 当前审批人
	rejectReason: String,
	approveStatus: String, // Y,N,D
	// approveTime: Number
})

let OverTime = mongoose.model('OverTime', OverTimeSchema);

module.exports = OverTime;