let ApproveModel = require('../models/approve');

// add approve
exports.create = async (ctx, next) => { // {employeeUm,type,destination,reason,startTime,endTime,approverUm:[[{um,opt,remark}]]}
	
	let approveInfo = ctx.request.body;
	let {approverUm} = approveInfo;
	
	Object.assign(approveInfo,{currentApproverUm: approverUm[0],approveStatus:'D',approveTime:Date.now()});
	
	let approve = new ApproveModel(approveInfo);
	await approve.save()
		.then(()=>{
			console.log('add approve ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			console.log('add approve err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

//update approve info
exports.update = async (ctx, next) => { // {_id,um,opt,remark,approverUm:[[]],currentApproverUm:[]}
	
	let {_id,um,opt,remark,approverUm,currentApproverUm} = ctx.request.body;
	let approveStatus = 'D';
	if(opt === 'reject') approveStatus = 'N';
	
	let stage = -1;
	approverUm.forEach((stageUm,i)=>{
		stageUm.forEach(approve=>{
			if (approve.um===um) stage = i;
		})
	})
	// let stage = approverUm.indexOf(currentApproverUm);
	
	currentApproverUm.forEach((item)=>{
		if(item.um === um){ // 找到当前审批列表中审批的人
			item.opt = opt;
			item.remark = remark
		}
	});
	console.log(stage);
	approverUm[stage] = currentApproverUm;
	console.log(approverUm[stage]);
	
	let isStagePassed = currentApproverUm.every(item=>{
		if(item.opt==='resolve') return true;
	});
	if(isStagePassed){
		if (stage === (approverUm.length - 1)){ //is last
			currentApproverUm = [];
			approveStatus = 'Y';
		} else {
			currentApproverUm = approverUm[stage+1];
			approveStatus = 'D';
		}
	}
	
	let newInfo = {
		approverUm,
		currentApproverUm,
		approveStatus,
		approveTime:Date.now()
	};
	
	await ApproveModel.update({_id},newInfo)
		.then(()=>{
			console.log('update ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.error(err)
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
	await ApproveModel.find({employeeUm:um})
		.then((result)=>{
			// console.log(result);
			ctx.body = {
				success: true,
				result
			}
		})
		.catch((err)=>{
			console.error(err)
			ctx.body = {
				success: false,
				msg: err
			}
		})
};

// wait my approve
exports.waitMyApprove = async (ctx, next) => {
	let {um} = ctx.request.body;
	await ApproveModel.where("currentApproverUm")
		.then((result)=>{
			let r = [];
			result.forEach((item,i)=>{
				item.currentApproverUm&&item.currentApproverUm.forEach(approve=>{
					if (approve.um===um&&approve.opt==='') r.push(result[i])
				})
			});
			ctx.body = {
				success: true,
				result: r
			}
		})
		.catch((err)=>{
			console.error(err);
			ctx.body = {
				success: false,
				msg: err
			}
		})
};


// delete
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await ApproveModel.remove({_id})
		.then(()=>{
			console.log('delete ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.error(err);
			ctx.body = {
				success: false,
				msg: err
			}
		})
};
