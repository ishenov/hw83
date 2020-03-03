const express = require('express');

const Album = require('../models/Album');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {

	if (req.query.album){
		const tracksQuery = await Track.find({album : req.query.album});
		res.send(tracksQuery);
	}

	if (req.query.artist){
		try {
			const albums = await Album.find({artist : req.query.artist}).select('_id');
			const albumsId = albums.map(album => album._id);
			const tracks = await Track.find({album : {$in : albumsId}});
			res.send(tracks);
		} catch (e) {
			res.status(400).send(e);
		}
	}

	const tracks = await Track.find();

	return res.send(tracks);
});

router.post('/', async (req, res) => {
	try {
		const track = new Track(req.body);
		await track.save();
		return res.send(track);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;