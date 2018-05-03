let DepartmentModel = require('../models/department');

// show list
exports.index = async ctx => {
	await DepartmentModel.find({})
		.then((result) => {
			// console.log('show ok')
			ctx.body = {
				success: true,
				result
			}
		})
		.catch(err=>{
			// console.log('show err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// add department
exports.create = async (ctx, next) => {
	let departmentInfo = ctx.request.body;
	// console.log(departmentInfo);
	let department = new DepartmentModel(departmentInfo);
	await department.save()
		.then(()=>{
			// console.log('add ok')
			ctx.body = {
				success: true,
			}
		})
		.catch(err =>{
			// console.log('add err')
			ctx.body = {
				success: false,
				msg: err
			}
		});
};

// delete department
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await DepartmentModel.remove({_id})
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

//update department info
exports.update = async (ctx, next) => {
	let {_id,newInfo} = ctx.request.body;
	await DepartmentModel.update({_id},newInfo)
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


//find depart by
exports.findBy = async (ctx, next) => {
	let {key, value} = ctx.request.body;
	console.log(key,value)
	await DepartmentModel.find({[key]: value})
		.then((result)=>{
			ctx.body = {
				success: true,
				result
			}
		})
		.catch((err)=>{
			// console.log(' search err')
			ctx.body = {
				success: false,
				msg: err
			}
		})
};
