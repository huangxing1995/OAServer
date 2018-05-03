'use strict'

let mongoose = require('mongoose');

let DemandSchema = new mongoose.Schema({
	employeeUm: String,
	receiveUm: String,
	
	describe: String,
	deadTime: Number,
	
	progress: [{
		percent: Number,
		remark: String
	}],
	status: String // Y, D
});

let Demand = mongoose.model('Demand', DemandSchema);

module.exports = Demand;