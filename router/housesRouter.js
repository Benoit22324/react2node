import { Router } from "express";
import House from "../models/House.js";
import { houseCreationVerification } from "../middlewares/houseCreationVerification.js";

const housesRouter = Router();

housesRouter.get("/houses", async (req, res) => {
    try {
        const houses = await House.find();

        if(houses.length < 1) return res.status(400).json({message: "No Houses Added"});

        return res.json(houses);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

housesRouter.get("/house/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const house = await House.findOne({_id: id});

        if (!house) return res.status(400).json({message: "House Not Found"});

        return res.json(house)
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

housesRouter.post("/addHouse", houseCreationVerification, (req, res) => {
    const {name, type, size, owner} = req.body;

    try {
        const newHouse = new House({name, type, size, owner: owner ? owner : ""});

        newHouse.save();
        return res.json({message: "House added"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

housesRouter.put("/updateHouse/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const house = await House.findOne({_id: id});

        if (!house) return res.status(400).json({message: "House Not Found"});

        const updatedHouse = await house.updateOne(req.body);

        if (updatedHouse.modifiedCount < 1) return res.json({message: "No Changes Detected"});

        return res.json({message: "House Updated"})
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

housesRouter.delete("/deleteHouse/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const house = await House.findOne({_id: id});

        if (!house) return res.status(400).json({message: "House Not Found"});

        await house.deleteOne();

        return res.json({message: "House Deleted"});
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
})

export default housesRouter;