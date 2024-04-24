require("dotenv").config()
const {API_KEY}=process.env
const {Videogame, Gender} =require("../db")
const axios=require("axios")
const getVideogames= async (req,res)=>{
    
    try {
        
  
        let db_videogames= await Videogame.findAll({include:{
            model: Gender, 
            as: 'Genders',
            attributes: ['uuid', 'name'],
            through: { attributes: [] }
        }})
        const response=await Promise.all([axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`),axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`),axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`)]) 
        let api_videogames=[]
        response.forEach((element) => {
           
            api_videogames=api_videogames.concat(element.data.results) 
        });
        api_videogames=api_videogames.map((element)=>{return {
            id:element.id,
            name:element.name,
            description:element.description,
            Genders:element.genres.map((element)=>{return{name:element.name,id:element.id}}),
            platforms:element.platforms.map((platforms)=>{return{id:platforms.platform.id,name:platforms.platform.name}}),
            imagen:element.background_image,
            rating:element.rating,
            release_date:element.released


        }})
        
        
        const videogames=db_videogames.concat(api_videogames)
         
        res.status(200).json(videogames)
    } catch (error) {
        res.status(500).json({message:"Hubo un error : " + error.message})
    }

    }
module.exports=getVideogames