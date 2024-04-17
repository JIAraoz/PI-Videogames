require("dotenv").config()
const {API_KEY}=process.env
const {Videogame, Gender} =require("../db")
const axios=require("axios")
const getVideogames= async (req,res)=>{
    
    try {
        const page=req.query.page
        const remaingGames=100
        let db_videogames= await Videogame.findAll({include:{
            model: Gender, 
            as: 'Genders',
            attributes: ['uuid', 'name'],
            through: { attributes: [] }
        }})
        const response=await Promise.all([axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`),axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`),axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`)]) 
        
        response.forEach((element) => {
            
            db_videogames=db_videogames.concat(element.data.results) 
        });
        
        
        const videogames=db_videogames
         
        res.status(200).json(videogames)
    } catch (error) {
        res.status(500).json({message:"Hubo un error : " + error})
    }

    }
module.exports=getVideogames