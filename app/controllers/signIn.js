let SignInModel = require('../models/signIn');
let DepartmentModel = require('../models/department')
let UserModel = require('../models/user')
/**
 * function : show my all sign info
 * input params: {empolyeeUm: string} unique
 * output params: [{info}]
 *
 * info:{
 *   date:Number,
 *	 isInRest:Boolean,
 *	 address: String,
 *	 startTime: Number,
 *	 endTime: Number,
 * }
 * */
exports.index = async ctx => { // {employeeUm: um}
	let {employeeUm} = ctx.request.body;
	// let test = await filterMyDepartmentSignIn('前端部')
	// console.log(test)
	await SignInModel.findOne({employeeUm}).exec()
		.then((result) => {
			// console.log('show signin list ok');
			// console.log(result.signInfo)
			ctx.body = {
				success: true,
				result:result.signInfo
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

/**
 * function : 上班时间下班时间打卡，修改当日时间信息，只能添加两个时间，当isRest = true时，可不添加上班下班时间
 *
 * input params: {
 *  employeeUm: String,
 *  signInfo:[
 *
 
 *  ]
 * }
 * output params: [{info}]
 *
 * info:{
 *   date:Number,
 *	 isInRest:Boolean,
 *	 address: String,
 *	 startTime: Number,
 *	 endTime: Number,
 * }
 * */
exports.update = async (ctx, next) => { // {employeeUm, newInfo:{info}}
	let {employeeUm,newInfo} = ctx.request.body;
	if (!newInfo.endTime){
		await SignInModel.update({employeeUm},{$push:{
					signInfo: newInfo,
				}})
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
	} else {
		await SignInModel.findOne({employeeUm})
			.then(user=>{
				let pos;
				console.log(user.signInfo);
				console.log(newInfo)
				for (let i=0; i<user.signInfo.length; i++){
					if (user.signInfo[i].date===newInfo.date) pos = i;
				}
				console.log(pos)
				user.signInfo[pos] = newInfo;
				user.signInfo.splice(pos, 0);
				user.save();
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
	}
};

async function filterMyDepartmentSignIn(department) {
	let users = await UserModel.find({departmentId:department});
	let results = [];
	
	users.forEach(async (user, i)=>{
		let r = await SignInModel.findOne({employeeUm: user.um})
		results.push(r)
	})
	
	return results;
	
}