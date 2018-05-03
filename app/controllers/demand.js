let DemandeModel = require('../models/demand');


// add demand
exports.create = async (ctx, next) => {//{employeeUm,receiveUm,describe,deadTime,progress:[{percent,remark}],status}
	
	let demandInfo = ctx.request.body;
	let {employeeUm,receiveUm,describe,deadTime} = demandInfo;
	
	Object.assign(demandInfo,{progress:[{percent:0,remark:'完成情况为0%'}],status:'D'});
	let demand = new DemandeModel(demandInfo);
	
	await demand.save()
		.then(()=>{
			console.log('add demand ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			console.log('add demand err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

//update demand info
exports.update = async (ctx, next) => { // {_id,newInfo}
	let {_id,newInfo} = ctx.request.body;
	await DemandeModel.update({_id},newInfo)
		.then(()=>{
			console.log('update demand ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('update demand err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};

// find my demand
exports.aboutMyDemand = async (ctx, next) => {
	let {um} = ctx.request.body;
	// console.log(um)
	await DemandeModel.find({"$or":[{employeeUm:um},{receiveUm:um}]})
		.then((result)=>{
			// console.log('find my demand ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch((err)=>{
			console.log(' find my demand err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};


// delete demand
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await DemandeModel.remove({_id})
		.then(()=>{
			console.log('delete ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('delete err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};
