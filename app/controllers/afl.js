var StateMachine = require('javascript-state-machine');
let AskForLeaveModel = require('../models/askForLeave');
let DepartmentModel = require('../models/department');


exports.create = async ctx => {
	console.log(123);
	let {employeeUm, approverUm} = ctx.request.body;
	let transitions = [];
	approverUm.forEach((item, i)=>{
		if (i===(approverUm.length-1)){
			transitions.push({ name: 'resolve',     from: approverUm[i],  to: 'Y' })
		} else {
			transitions.push({ name: 'resolve',     from: approverUm[i],  to: approverUm[i+1] })
		}
	});
	transitions.unshift({ name: 'resolve',     from: employeeUm,  to: approverUm[0] });
	transitions.push({ name: 'reject',     from: [...approverUm],  to: 'N' }); // 任何一个人拒绝

	var fsm = new StateMachine({
		init: employeeUm,
		transitions,
		methods: {
			onResolve:     function(e, from, to) { console.log(from, to)},
			onReject:     function(e, from, to) { console.log(from, to)},
		}
	});
	fsm.resolve();console.log(fsm.current);
	fsm.resolve();console.log(fsm.current);
	fsm.reject();console.log(fsm.current);
	await DepartmentModel.find({})
		.then((result) => {
			console.log('show ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			console.log('show err')
			ctx.body = {
				success: false,
				msg: err
			}
		});

	
}








// show list
exports.index = async ctx => {
	await AskForLeaveModel.find({}).exec()
		.then((result) => {
			console.log('show ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			console.log('show err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// add afl
exports.create = async (ctx, next) => {
	let askForLeaveInfo = ctx.request.body;
	let afl = new AskForLeaveModel(askForLeaveInfo);
	await afl.save()
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

// delete afl
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await AskForLeaveModel.remove({_id})
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

//update afl info
exports.update = async (ctx, next) => {
	let {_id,newInfo} = ctx.request.body;
	await AskForLeaveModel.update({_id},newInfo)
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