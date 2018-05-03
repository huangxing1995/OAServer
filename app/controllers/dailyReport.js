let DailyReportModel = require('../models/dailyReport');

// show daily report list
exports.index = async ctx => { //{employeeUm:um}
	let {employeeUm} = ctx.request.body;
	// console.log(employeeUm)
	await DailyReportModel.find({employeeUm})
		.then((result) => {
			console.log('show daily report ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			console.error('show daily report err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

exports.groupReports = async ctx => { //{employeeUm:[um1,um2,...]}
	let {employeeUm} = ctx.request.body;
	// console.log(employeeUm)
	await DailyReportModel.find({employeeUm:{$in:[...employeeUm]}})
		.then((result) => {
			console.log('show daily report ok');
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			console.error('show daily report err');
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// add schedule
exports.create = async (ctx, next) => { //{employeeUm,date,finished,unfinished,workHours}
	let dailyReportInfo = ctx.request.body;
	// console.log(scheduleInfo);
	let dailyReport = new DailyReportModel(dailyReportInfo);
	await dailyReport.save()
		.then(()=>{
			console.log('add daily report ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			console.log('add daily report err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// delete schedule
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await DailyReportModel.remove({_id})
		.then(()=>{
			console.log('delete daily report ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('delete daily report err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};

//update schedule info
exports.update = async (ctx, next) => {//{_id, newInfo} //{employeeUm, date,finished,unfinished,workHours}
	let {_id,newInfo} = ctx.request.body;
	// console.log(_id,newInfo);
	await DailyReportModel.update({_id},newInfo)
		.then(()=>{
			console.log('update daily report ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('update daily report err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};