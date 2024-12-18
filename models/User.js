import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 4
    }
})

export default mongoose.model("User", userSchema);