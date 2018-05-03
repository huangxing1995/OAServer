'use strict'

let mongoose = require('mongoose');

let AnnouncementSchema = new mongoose.Schema({
	theme: String,
	content: String,
	time: Number
})

let Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;