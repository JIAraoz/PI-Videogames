require("dotenv").config()
const {API_KEY}=process.env
const isUUID =require("./utils/validationUuid")
const axios =require("axios")
const {Videogame}=require("../db")
const getVideogamesById=async (req,res)=>{
   try {
    const id=req.params.idVideogame
    if(!id) res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"})
    
    if(isUUID(id)){
        const videogame= await Videogame.findOne({where:{
            uuid:id
        }} )
        const genders=await videogame.getGenders()
      const game={
            uuid:videogame.uuid,
            name:videogame.name,
            description:videogame.description,
            Genders:genders,
            platforms:videogame.platforms.map((e)=>{return{name:e}}),
            imagen:videogame.imagen,
            rating:videogame.rating,
            release_date:videogame.release_date
        }
        if(videogame.length===0) return res.status(404).json({message:"No se encontro ningun juego con ese uuid"})
        
        res.status(200).json(game)
    }
    else{
        const {data}=await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
       const game={id:data.id,
        name:data.name,
        description:data.description,
        Genders:data.genres.map((element)=>{return{name:element.name,id:element.id}}),
        platforms:data.platforms.map((platforms)=>{return{id:platforms.platform.id,name:platforms.platform.name}}),
        imagen:data.background_image,
        rating:data.rating,
        release_date:data.released}
     
        res.status(200).json(game) 
    } 
   } catch (error) {
    
    res.status(500).json({message:"Hubo un error : " + error.message})
   }
}
module.exports=getVideogamesById