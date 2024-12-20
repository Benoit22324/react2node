import House from "../models/House.js";

export const getAllHouses = async (req, res) => {
    try {
        const houses = await House.find().populate("owner", "firstName lastName email");

        if(houses.length < 1) return res.status(400).json({message: "No Houses Added"});

        return res.json(houses);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const getHouseById = async (req, res) => {
    const {id} = req.params;

    try {
        const house = await House.findOne({_id: id}).populate("owner", "firstName lastName email");

        return res.json(house)
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const addNewHouse = async (req, res) => {
    const {name, type, size, owner} = req.body;

    try {
        const newHouse = await new House({name, type, size, owner: owner ? owner : null});

        newHouse.save();
        return res.json({message: "House added"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const updateHouseInfo = async (req, res) => {
    const {id} = req.params;

    try {
        const house = await House.findOne({_id: id});
        const updatedHouse = await house.updateOne(req.body);

        if (updatedHouse.modifiedCount < 1) return res.json({message: "No Changes Detected"});

        return res.json({message: "House Updated"})
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}

export const deleteHouse = async (req, res) => {
    const {id} = req.params;

    try {
        await House.deleteOne({_id: id});

        return res.json({message: "House Deleted"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}