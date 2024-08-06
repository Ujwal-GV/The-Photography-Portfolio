const mongoose = require("mongoose");

const connectToMongo = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    }
    catch (err){
        console.log("Could not connect to MongoDB", err);
    }
};

module.exports = { connectToMongo };