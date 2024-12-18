import House from "../models/House.js";

export const houseExistingVerification = async (req, res, next) => {
    const {id} = req.params;

    try {
        const house = await House.findOne({_id: id});
    
        if (!house) return res.status(400).json({message: "House Not Found"});
    
        next();
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}