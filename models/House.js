import mongoose from "mongoose";

const houseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    owner: String
})

export default mongoose.model("House", houseSchema);