const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');

const Albums = require('../models/Album');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  const albums = await Albums.find();
  res.send(albums);
});

router.get('/:id', async (req, res) => {
  try {
    const album = await Albums.findById(req.params.id);

    if (!album) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(album);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const albumData = req.body;

  if (req.file) {
    albumData.image = req.file.filename;
  }

  const album = new Albums(albumData);

  try {
    await album.save();

    return res.send({id: album._id});
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;