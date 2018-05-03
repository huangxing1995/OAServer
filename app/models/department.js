'use strict'

let mongoose = require('mongoose');

let DepartmentSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String,
	},
	managerUm: String
})

let DepartmentModel = mongoose.model('Department', DepartmentSchema);

module.exports = DepartmentModel;