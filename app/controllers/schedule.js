let ScheduleModel = require('../models/schedule');

// show schedule list
exports.index = async ctx => { //{employeeUm:um}
	let {employeeUm} = ctx.request.body;
	console.log(employeeUm)
	await ScheduleModel.find({employeeUm})
		.then((result) => {
			console.log('show ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			console.error('show err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// add schedule
exports.create = async (ctx, next) => { //{employeeUm, date, items:[{startTime,endTime,todo}]
	let scheduleInfo = ctx.request.body;
	// console.log(scheduleInfo);
	let schedule = new ScheduleModel(scheduleInfo);
	await schedule.save()
		.then(()=>{
			console.log('add ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			console.log('add err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// delete schedule
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await ScheduleModel.remove({_id})
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

//update schedule info
exports.update = async (ctx, next) => {// {_id, newInfo} nesInfo:{employeeUm,st,et,todos}
	let {_id,newInfo} = ctx.request.body;
	// console.log(_id,newInfo);
	await ScheduleModel.update({_id},newInfo)
		.then(()=>{
			console.log('update ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('update err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};