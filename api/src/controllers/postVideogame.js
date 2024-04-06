const {Videogame,Gender} = require("../db")

const postVideogame= async(req,res)=>{
  try {
    const {name,description,platforms,image,release_date,rating,genders}=req.body
    if(!name||!description||!platforms||!image||!release_date||!rating||!genders ||!Array.isArray(genders)){res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"})}
    else{
      const videogame= await Videogame.create({name,description,platforms,image,release_date,rating}) 
     await Promise.all(genders.map(async (genderUuid) => {
      const gender = await Gender.findByPk(genderUuid);
      if (gender) {
        await videogame.addGender(gender);
      }}))
     res.status(201).json({message:"videogame creado exitosamente"})
  } 
     
  } catch (error) {
    res.status(500).json({message:"Hubo un error : " + error.message})
  }

}
module.exports=postVideogame