'use strict'

let mongoose = require('mongoose');

let SignInSchema = new mongoose.Schema({

	employeeUm: String,
	
	signInfo:[{
		date:Number,
		isInRest:Boolean,
		startAddress: String,
		endAddress: String,
		startTime: Number,
		endTime: Number,
	}]
})

let SignIn = mongoose.model('SignIn', SignInSchema);

module.exports = SignIn;