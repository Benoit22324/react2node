import { Router } from "express";
import { houseCreationVerification } from "../middlewares/houseCreationVerification.js";
import { houseExistingVerification } from "../middlewares/houseExistingVerification.js";
import { addNewHouse, deleteHouse, getAllHouses, getHouseById, updateHouseInfo } from "../controllers/housesController.js";

const housesRouter = Router();

housesRouter.get("/houses", getAllHouses);

housesRouter.get("/house/:id", houseExistingVerification, getHouseById);

housesRouter.post("/addHouse", houseCreationVerification, addNewHouse);

housesRouter.put("/updateHouse/:id", houseExistingVerification, updateHouseInfo);

housesRouter.delete("/deleteHouse/:id", houseExistingVerification, deleteHouse);

export default housesRouter;