let AskForLeaveModel = require('../models/askForLeave');
let StateMachine = require('javascript-state-machine')

// add afl
exports.create = async (ctx, next) => { // {employeeUm,type,reason,startTime,endTime,approverUm:[]}
	
	let aflInfo = ctx.request.body;
	let {employeeUm,type,reason,startTime,endTime,approverUm} = aflInfo;
	
	let afl = new AskForLeaveModel(aflInfo);
	Object.assign(afl,{currentApproverUm: approverUm[0],rejectReason:'',approveStatus:'D'});
	await afl.save()
		.then(()=>{
			// console.log('add afl ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			// console.log('add afl err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

//update afl info
exports.update = async (ctx, next) => { // {um,approverUm,_id,opt,rejectReason}
	// console.log(ctx.request.body);
	let {um,approverUm,_id,opt,rejectReason} = ctx.request.body;
	let currentApproverUm,approveStatus;
	let pos = approverUm.indexOf(um);
	// 判断是否是最后一个审批人
	if (pos === (approverUm.length - 1)){ //is last
		currentApproverUm = null;
		if( opt === "resolve"){
			approveStatus = 'Y';
		} else {
			approveStatus = 'N';
		}
	} else {
		currentApproverUm = approverUm[pos+1];
		if( opt === "reject"){
			approveStatus = 'N';
		} else {
			approveStatus = 'D';
		}
	}
	
	let newInfo = {
		currentApproverUm,
		rejectReason,
		approveStatus
	};
	
	await AskForLeaveModel.update({_id},newInfo)
		.then(()=>{
			// console.log('update ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			// console.log('update err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};

// find my approve
exports.findMyApprove = async (ctx, next) => {
	let {um} = ctx.request.body;
	// console.log(um)
	await AskForLeaveModel.find({employeeUm:um})
		.then((result)=>{
			// console.log('findMyApprove ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch((err)=>{
			// console.log(' findMyApprove err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};

// wait my approve
exports.waitMyApprove = async (ctx, next) => {
	let {um} = ctx.request.body;
	await AskForLeaveModel.find({currentApproverUm:um})
		.then((result)=>{
			// console.log('waitMyApprove ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch((err)=>{
			// console.log(' waitMyApprove err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};


// delete
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await AskForLeaveModel.remove({_id})
		.then(()=>{
			// console.log('delete ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			// console.log('delete err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};
