const nanoid = require('nanoid');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
	user: {
		type: String,
		required: true,
		unique: true
	},
	track: {
		type: String,
		required: true
	},
	datetime: {
		type: String,
		required: true,
	}
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;