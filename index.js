import express from "express";
import "dotenv/config";
import {movies} from "./data/moviesData.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.get("/", (req, res) => {
    res.send("Bienvenue sur le port 3002");
});

app.get("/movies", (req, res) => {
    res.send(movies);
});

app.get("/movie/:id", (req, res) => {
    const {id} = req.params;
    try {
        const movieById = movies.find(movie => movie.id === parseInt(id));

        if(!movieById) return res.status(400).json({message: "Not Found"});

        return res.json(movieById)
    } catch (err) {
        return res.status(500).json({message: "Error"})
    }
})

app.post('/movies', (req, res) => {
    let {title, genre} = req.body
    console.log(req)
    const newMovie = {
        id : movies.length + 1,
        title,
        genre,
    }
    movies.push(newMovie)
    return res.json(movies)
})

app.listen(PORT, () => console.log(`Serveur allumé sur le port ${PORT}`));