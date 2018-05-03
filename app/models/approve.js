'use strict'

let mongoose = require('mongoose');

let ApproveSchema = new mongoose.Schema({
	employeeUm: String,
	
	type: String,
	destination: String,
	reason: String,
	startTime: Number,
	endTime: Number,
	
	approverUm: [[{um:String,opt:String,remark:String}]], // 所有审批人员列表
	currentApproverUm: [{um:String,opt:String,remark:String}], // 当前审批人
	
	approveStatus: String, // Y,N,D
	approveTime: Number
});

let Approve = mongoose.model('Approve', ApproveSchema);

module.exports = Approve;