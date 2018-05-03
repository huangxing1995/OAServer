'use strict'

let mongoose = require('mongoose');

let PositionSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
},
	departmentId: String
});

PositionSchema.statics.show = function () {
	return this.find({}).exec();
};
PositionSchema.statics.findById = function (id) {
	return this.findOne({_id:id}).exec();
};
PositionSchema.statics.findByName = function (name) {
	return this.findOne({name:name}).exec();
};
PositionSchema.statics.addPosition = function (positionInfo) {
	return this.findOneAndUpdate({name: positionInfo.name},positionInfo).exec()
};
PositionSchema.statics.deletePosition = function (id) {
	return this.remove({_id: id}).exec()
};
PositionSchema.statics.updatePosition = function (id, positionInfo) {
	return this.findOneAndUpdate({_id: id},positionInfo).exec();
}

let PositionModel = mongoose.model('Position', PositionSchema);

module.exports = PositionModel;