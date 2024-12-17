import express from "express"

const app = express();

app.get("/", (req, res) => {
    res.send("Bienvenue sur le port 3002")
})

app.listen(3002, () => console.log("Serveur allumé sur le port 3002"))