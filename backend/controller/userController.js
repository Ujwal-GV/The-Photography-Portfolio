const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(400).json({ message: 'User not found.' });
    }
    try {
        const decodedPassword = await bcrypt.compare(password, user.password)
        // console.log('pass',decodedPassword);
        if(!decodedPassword) {
            return res.status(401).json({ message: 'Invalid password.' });
        }
        const token = jwt.sign({ name: user.name}, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log(token, user);
        res.status(200).json({ token, user, message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
    }
}

async function signup(req, res){
    const {name, email, password, phone} = req.body;
    const user = await User.findOne({ email: email });
    if(user) 
        return res.status(400).json({ message: 'User already exists.' });
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
        });

        if (newUser) {
            res.status(201).json({ message: "User created" });
        // console.log(newUser);
        } else {
            res.status(401).json({ message: "Failed to create user" });
        }
} catch (error) {
        console.log(error);
    }
}

module.exports = { login, signup };