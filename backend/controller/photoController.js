const { photoModel } = require('../model/photoModel');

async function photoController(req, res){
    const { title, description, photographerName, date, mobile } = req.body;
    const image = req.file ? req.file.originalname : '';
    
    const newPhoto = new photoModel({
        title,
        image: req.file.originalname,
        description,
        photographerName,
        mobile,
        date: new Date(Date. now()),
    });

    try {
        await newPhoto.save();
        // console.log(newPhoto);
        res.status(200).json({ message: 'Photo uploaded successfully!!' });
    } catch (error) {
        console.error(error);
    }
}

async function getPhotos (req, res) {
    try {
      const photos = await photoModel.find();
    //   console.log(photos);
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ message: error });
    }
}

async function deletePhoto(req, res) {
    try {
        const { id } = req.params;
        const findPhoto = await photoModel.findByIdAndDelete(id);
        if(findPhoto) {
            res.status(200).json({ message: "Successfully deleted" });
        } else {
            res.status(404).json({ message: "Couldnot find the photograph" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = { photoController, getPhotos, deletePhoto };