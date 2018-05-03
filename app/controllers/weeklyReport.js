let WeeklyReportModel = require('../models/weeklyReport');

// show weekly report list
exports.index = async ctx => { //{employeeUm:um}
	let {employeeUm} = ctx.request.body;
	// console.log(employeeUm)
	await WeeklyReportModel.find({employeeUm})
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
	console.log(employeeUm)
	await WeeklyReportModel.find({employeeUm:{$in:[...employeeUm]}})
		.then((result) => {
			console.log('show weekly report ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			console.error('show weekly report err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// add weekly
exports.create = async (ctx, next) => { //{employeeUm,date:[],summary,goal}
	let weeklyReportInfo = ctx.request.body;
	// console.log(weeklyReportInfo);
	let weeklyReport = new WeeklyReportModel(weeklyReportInfo);
	await weeklyReport.save()
		.then(()=>{
			console.log('add weekly report ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			console.log('add weekly report err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// delete weekly
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await WeeklyReportModel.remove({_id})
		.then(()=>{
			console.log('delete weekly report ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('delete weekly report err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};

//update weekly info
exports.update = async (ctx, next) => {//{_id, newInfo} //{employeeUm,date:[],summary,goal}
	let {_id,newInfo} = ctx.request.body;
	// console.log(_id,newInfo);
	await WeeklyReportModel.update({_id},newInfo)
		.then(()=>{
			console.log('update weekly report ok')
			ctx.body = {
				success: true,
			}
		})
		.catch((err)=>{
			console.log('update weekly report err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};