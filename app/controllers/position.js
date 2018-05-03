let PositionModel = require('../models/position');

// show list
exports.index = async ctx => {
	await PositionModel.find({}).exec()
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

// add position
exports.create = async (ctx, next) => {
	let positionInfo = ctx.request.body;
	let position = new PositionModel(positionInfo);
	await position.save()
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

// delete position
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await PositionModel.remove({_id})
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

//update position info
exports.update = async (ctx, next) => {
	let {_id,newInfo} = ctx.request.body;
	await PositionModel.update({_id},newInfo)
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


