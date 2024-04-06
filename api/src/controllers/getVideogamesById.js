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
        const game= await Videogame.findOne({where:{
            uuid:id
        }})
        if(game.length===0) res.status(404).json({message:"No se encontro ningun juego con ese uuid"})
        res.status(200).json({game})
    }
    else{
        const {data}=await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        
        const game=data
       
        res.status(200).json({game}) 
    } 
   } catch (error) {
    
    res.status(500).json({message:"Hubo un error : " + error.response.status+" "+error.response.statusText})
   }
}
module.exports=getVideogamesById