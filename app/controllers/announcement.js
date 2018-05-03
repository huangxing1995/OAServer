let AnnouncementModel = require('../models/announcement');

// show list
exports.index = async ctx => {
	await AnnouncementModel.find({}).exec()
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

// add anno
exports.create = async (ctx, next) => {
	let annoInfo = ctx.request.body;
	let anno = new AnnouncementModel(annoInfo);
	await anno.save()
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

// delete anno
exports.delete = async (ctx, next) => {
	let {_id} = ctx.request.body;
	await AnnouncementModel.remove({_id})
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

//update anno info
exports.update = async (ctx, next) => {
	let {_id,newInfo} = ctx.request.body;
	await AnnouncementModel.update({_id},newInfo)
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