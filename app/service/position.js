let mongoose = require('mongoose');

let PositionUser = require('../../app/models/position');

exports.index = () => {
	return PositionUser.find({})
};
exports.findByUm = async um =>{
	return await PositionUser.findOne({um})
}
exports.create = async (userInfo) => {
	let user = new PositionUser(userInfo);
	await user.save((err, res)=>{
		if(err) return false
		else return true
	})
};

exports.update = () => {

}

exports.delete = () => {

}
