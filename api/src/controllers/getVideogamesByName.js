require("dotenv").config()
const {API_KEY}=process.env

const {Op}=require("sequelize")
const {Videogame}=require("../db")
const axios=require("axios")
const isUUID =require("./utils/validationUuid")
const getVideogamesByName= async (req,res)=>{
try {
    
    const { name }=req.query
    if(!name) res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"}) 
    let db_game=await Videogame.findAll({where:{
        name: {
            [Op.iLike]: `%${name}%`
          },
          
        },
        limit:15
        

})
if (db_game.length < 15) {
    const remainingLimit = 15 - db_game.length;
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    let apiGames = []
    for (let i = 0; i < remainingLimit; i++) {
      apiGames.push(response.data.results[i])
      
    }


    
    db_game = db_game.concat(apiGames);
  }
  


if (db_game.length > 0) {

  res.status(200).json(db_game);
} else {
  
  res.status(404).json({ message: "No hay juegos encontrados con ese nombre" });
}
} catch (error) {
    res.status(500).json({message:"Hubo un error al obtener los juegos: " + error.message})
}

}
module.exports=getVideogamesByName