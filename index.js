import express from "express";
import "dotenv/config";
import moviesRouter from "./router/moviesRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(moviesRouter);

app.listen(PORT, () => console.log(`Serveur allumé sur le port ${PORT}`));