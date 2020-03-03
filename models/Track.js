const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	album: {
		type: String
	},
	duration: String
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;