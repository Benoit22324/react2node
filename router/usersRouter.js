import { Router } from "express";
import { userCreationVerification } from "../middlewares/userCreationVerification.js";
import { addNewUser, deleteUser, getAllUsers, getUserById, updateUserInfo } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users", getAllUsers);

usersRouter.get("/user/:id", getUserById);

usersRouter.post("/addUser", userCreationVerification, addNewUser);

usersRouter.put("/updateUser/:id", updateUserInfo);

usersRouter.delete("/deleteUser/:id", deleteUser);

export default usersRouter;