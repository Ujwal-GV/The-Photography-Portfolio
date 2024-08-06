const{ photoModel } = require("../model/photoModel");
const path = require("path");
const multer = require('multer');
const express = require('express');
const { photoController, getPhotos, deletePhoto } = require('../controller/photoController');

const photoRoute = express.Router();

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

photoRoute.post('/upload', upload.single('image'), photoController);
photoRoute.get('/photos', getPhotos);
photoRoute.delete('/:id', deletePhoto);

module.exports = photoRoute;