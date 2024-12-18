import { Router } from "express";
import User from "../models/User.js";
import { userCreationVerification } from "../middlewares/userCreationVerification.js";

const usersRouter = Router();

usersRouter.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        return res.json(users);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

usersRouter.get("/user/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(400).json({message: "User Not Found"});

        return res.json(user);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

usersRouter.post("/addUser", userCreationVerification, async (req, res) => {
    const {firstName, lastName, email, age, password} = req.body;

    try {
        const newUser = new User({firstName, lastName, email, age, password});

        newUser.save();
        return res.json({message: "User added"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

usersRouter.put("/updateUser/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});

        if (!user) return res.status(400).json({message: "User Not Found"});

        return res.json(user);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

usersRouter.delete("/deleteUser/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) return res.status(400).json({message: "User Not Found"});

        return res.json({message: "user deleted"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

export default usersRouter;