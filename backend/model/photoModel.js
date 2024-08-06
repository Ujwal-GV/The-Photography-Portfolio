const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    title: { 
        type: String,
    },
    photographerName: { 
        type: String,
    },
    description: { 
        type: String,
    },
    image: { 
        type: String,
    },
    mobile: { 
        type: Number,
    },
    date: { 
        type: Date, 
        default: new Date() 
    }
});

const photoModel = mongoose.model("photoModel", photoSchema);

module.exports = { photoModel };