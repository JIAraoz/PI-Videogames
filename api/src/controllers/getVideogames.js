require("dotenv").config()
const {API_KEY}=process.env
const {Videogame, Gender} =require("../db")
const axios=require("axios")
const getVideogames= async (req,res)=>{
    try {
        const db_videogames= await Videogame.findAll({include:{
            model: Gender, 
            as: 'Genders',
            attributes: ['uuid', 'name'],
            through: { attributes: [] }
        }})
        /* const {data}=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`) */
        const {data}=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const api_videogames=data.results.slice(0,100)
        const videogames=db_videogames.concat(api_videogames) 
        
        res.status(200).json(videogames)
    } catch (error) {
        res.status(500).json({message:"Hubo un error : " + error.message})
    }

    }
module.exports=getVideogames