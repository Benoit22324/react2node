import House from "../models/House.js";

export const houseCreationVerification = async (req, res, next) => {
    const {name, type, size} = req.body;

    if (!name || !type || !size) return res.status(400).json({message: "Field Required"});

    const existHouse = await House.findOne({name});

    if (existHouse) return res.status(400).json({message: "House name taken"});

    next();
}