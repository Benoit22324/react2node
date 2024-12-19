import { Router } from "express";
import {movies} from "../data/moviesData.js"

const moviesRouter = Router();

moviesRouter.get("/movies", (req, res) => {
    res.send(movies);
});

moviesRouter.get("/movie/:id", (req, res) => {
    const {id} = req.params;

    try {
        const movieById = movies.find(movie => movie.id === parseInt(id));

        if(!movieById) return res.status(400).json({message: "Not Found"});

        return res.json(movieById)
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`})
    }
})

moviesRouter.post('/addMovie', (req, res) => {
    let {title, genre} = req.body;

    const newMovie = {
        id : movies.length + 1,
        title,
        genre,
    }

    movies.push(newMovie)

    return res.json(movies)
})

moviesRouter.put('/updateMovie/:id', (req, res) => {
    let {id} = req.params;
    let {title, genre} = req.body;

    try {
        if (!title || !genre) return res.status(400).json({message: "Need Title & Genre"});

        const movieChoosen = movies.find(movie => movie.id === parseInt(id));
        movieChoosen.title = title;
        movieChoosen.genre = genre;

        return res.json(movies);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`})
    }
})

moviesRouter.delete('/deleteMovie/:id', (req, res) => {
    let {id} = req.params;

    try {
        const movieChoosen = movies.find(movie => movie.id == parseInt(id));

        if (!movieChoosen) return res.status(400).json({message: "Not Found"})

        const index = movies.indexOf(movieChoosen)
        movies.splice(index, 1)

        return res.json(movies);
    } catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`})
    }
})

export default moviesRouter