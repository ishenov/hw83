const express = require('express');

const Tracks = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
	const tracks = await Tracks.find();
	res.send(tracks);
});

router.post('/', async (req, res) => {
	const track = new Tracks(req.body);

	await track.save();

	return res.send(track);
});

module.exports = router;