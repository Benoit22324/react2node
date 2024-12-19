import House from "../models/House.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if(users.length < 1) return res.status(400).json({message: "No User Created"});

        return res.json(users);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(400).json({message: "User Not Found"});

        return res.json(user);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const addNewUser = (req, res) => {
    const {firstName, lastName, email, age, password} = req.body;

    try {
        const newUser = new User({firstName, lastName, email, age, password});

        newUser.save();
        return res.json({message: "User added"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const updateUserInfo = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});

        if (!user) return res.status(400).json({message: "User Not Found"});

        return res.json(user);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        await House.deleteMany({owner: id});

        if (!user) return res.status(400).json({message: "User Not Found"});

        return res.json({message: "user deleted"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}