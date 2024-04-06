const { Router } = require('express');
const getVideogames=require("../controllers/getVideogames")
const getVideogamesById=require("../controllers/getVideogamesById")
const postVideogame=require("../controllers/postVideogame")
const getGenders=require("../controllers/getGenders")
const getVideogamesByName=require("../controllers/getVideogamesByName")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames",getVideogames)
router.get("/videogames/:idVideogame",getVideogamesById)
router.get("/videogamesByName/",getVideogamesByName)
router.post("/videogames",postVideogame)
router.get("/genders",getGenders)


module.exports = router;
