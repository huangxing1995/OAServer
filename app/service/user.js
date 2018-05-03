let mongoose = require('mongoose');

let UserModel = require('../../app/models/user');

exports.index = () => {
	return UserModel.find({})
};
exports.findByUm = async um =>{
	return await UserModel.findOne({um})
}
exports.create = async (userInfo) => {
	let user = new UserModel(userInfo);
	await user.save((err, res)=>{
		if(err) return false
		else return true
	})
};

exports.update = () => {

}

exports.delete = () => {

}
