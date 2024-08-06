const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { connectToMongo } = require("./connection.js");
const photoRoute = require("./routes/photoRoute.js");
const userRoute = require("./routes/userRoute.js");

dotenv.config();

const app = express();

connectToMongo();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/photography", photoRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))