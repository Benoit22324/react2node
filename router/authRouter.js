import { Router } from "express";
import { userCreationVerification } from "../middlewares/userCreationVerification.js";
import { loginUser, registerUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", userCreationVerification, registerUser);
authRouter.post("/login", loginUser);

export default authRouter;