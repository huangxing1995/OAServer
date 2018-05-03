'use strict'

let mongoose = require('mongoose');

let AskForLeaveSchema = new mongoose.Schema({
	employeeUm: String,
	
	type: String,
	reason: String,
	startTime: Number,
	endTime: Number,
	
	approverUm: [[{um:String,remark:String}]], // 所有审批人员列表
	currentApproverUm: String, // 当前审批人
	rejectReason: String,
	approveStatus: String, // Y,N,D
	
});

let AskForLeave = mongoose.model('AskForLeave', AskForLeaveSchema);

module.exports = AskForLeave;