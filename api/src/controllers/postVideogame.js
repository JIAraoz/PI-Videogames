const {Videogame,Gender} = require("../db")

const postVideogame= async(req,res)=>{
  try {
    const {name,description,platforms,imagen,release_date,rating,genders}=req.body
    console.log(req.body);
    if(!name||!description||!platforms||!imagen||!release_date||!rating||!genders ){res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"})} 
     else{
      const videogame= await Videogame.create({name,description,platforms,imagen,release_date,rating}) 
     await Promise.all(genders.map(async (genderName) => {
      const gender = await Gender.findAll({where:{name:genderName}});
      if (gender) {
        console.log(gender);
        await videogame.addGender(gender);
      }}))
     res.status(201).json({message:"videogame creado exitosamente"})
  }  
      
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:"Hubo un error : " + error.message})
  }

} 
module.exports=postVideogame