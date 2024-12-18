import User from "../models/User.js";

export const userCreationVerification = async (req, res, next) => {
    const {firstName, lastName, email, age, password} = req.body;

    if (!firstName || !lastName || !email || !age || !password) return res.status(400).json({message: "Fields Required"});

    const existUser = await User.findOne({email});

    if (existUser) return res.status(400).json({message: "Email already taken"});

    next();
} 