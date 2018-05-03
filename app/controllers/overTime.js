let OverTimeModel = require('../models/overTime');

// add otInfo
exports.create = async (ctx, next) => { // {employeeUm,reason,startTime,endTime,approverUm:[]}
	
	let otInfo = ctx.request.body;
	let {employeeUm,destination,reason,startTime,endTime,approverUm} = otInfo;
	console.log(otInfo)
	let ot = new OverTimeModel(otInfo);
	Object.assign(ot,{currentApproverUm: approverUm[0],rejectReason:'',approveStatus:'D'});
	await ot.save()
		.then(()=>{
			// console.log('add bt ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			// console.log('add bt err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

//update ot info
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
	
	await OverTimeModel.update({_id},newInfo)
		.then(()=>{
			// console.log('update bt ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			// console.log('update bt err')
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
	await OverTimeModel.find({employeeUm:um})
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
	await OverTimeModel.find({currentApproverUm:um})
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
	await OverTimeModel.remove({_id})
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