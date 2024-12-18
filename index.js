import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import moviesRouter from "./router/moviesRouter.js";
import usersRouter from "./router/usersRouter.js";

const app = express();
const PORT = process.env.PORT;

const MANGO_URI = process.env.MANGO_URI;

mongoose.connect(MANGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:" ));
db.on("connected", () => console.log("DB connecté"));

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(moviesRouter, usersRouter);

app.listen(PORT, () => console.log(`Serveur allumé sur le port ${PORT}`));