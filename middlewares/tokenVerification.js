import jwt from "jsonwebtoken";

export const tokenVerification = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        if (!token) return res.status(400).json({message: "Missing Token"});

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) return res.status(400).json({message: "Invalid Token"});

        next();
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
}