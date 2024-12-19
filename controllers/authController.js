import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {firstName, lastName, email, age, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            firstName,
            lastName,
            email,
            age,
            password: hashedPassword,
        });

        newUser.save();
        return res.json({message: "User registered"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Email or Password Invalid"});

        const passwordVerification = await bcrypt.compare(password, user.password);
        if (!passwordVerification) return res.status(400).json({message: "Email or Password Invalid"});
    
        const token = jwt.sign({user: user._id}, process.env.JWT_SECRET);
        return res.json(token);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}