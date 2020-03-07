const express = require('express');
const User = require('../models/User');
const TrackHistory = require('../models/TrackHistory');
const router = express.Router();

router.post('/', async (req,res) => {
	console.log(req.get('Token'));
	if (!req.get('Token')) return res.status(400).send({message : 'no Token in request'});
	const user = await User.findOne({token: req.get('Token')});
	if (!user) {
		return res.status(401).send({error : 'No access'});
	}
	if (!req.body.track){
		return res.status(400).send({message : "no track in request"});
	}
	const datetime = new Date().toISOString();
	const trackHistory = new TrackHistory({
		datetime,
		track : req.body.track,
		user : user._id,
	});
	try {
		await trackHistory.save();
		res.send(trackHistory);
	} catch (e) {
		res.send(e);
	}

});

module.exports = router;