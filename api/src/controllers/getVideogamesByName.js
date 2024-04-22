require("dotenv").config()
const {API_KEY}=process.env


const {Op}=require("sequelize")
const {Videogame,Gender}=require("../db")
const axios=require("axios")
const isUUID =require("./utils/validationUuid")
const getVideogamesByName= async (req,res)=>{
try {
    
    const { name }=req.query
    if(!name) return res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"}) 
    let db_game=await Videogame.findAll({where:{
        name: {
            [Op.iLike]: `%${name}%`
          },
        
        },include:{
          model: Gender, 
          as: 'Genders',
          attributes: ['uuid', 'name'],
          through: { attributes: [] }
      },
        limit:15
        

})
if (db_game.length < 15) {
    const remainingLimit = 15 - db_game.length;
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    let apiGames = []
    console.log(response.data);
    if(response.data.results[0].id){
      for (let i = 0; i < remainingLimit; i++) {
        const videogame=response.data.results[i]
        const game={
          id:videogame.id,
          name:videogame.name,
          description:videogame.description,
          Genders:videogame.genres.map((element)=>{return{name:element.name,id:element.id}}),
          platforms:videogame.platforms.map((platforms)=>{return{id:platforms.platform.id,name:platforms.platform.name}}),
          imagen:videogame.background_image,
          rating:videogame.rating,
          release_date:videogame.released
        }
        apiGames.push(game)
        
      }
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