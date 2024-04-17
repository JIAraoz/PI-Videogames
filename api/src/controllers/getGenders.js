require("dotenv").config()
const {Gender}=require("../db")
const {API_KEY}=process.env
const axios =require("axios")
const getGenders=async(req,res)=>{
    try {
        let genders =await Gender.findAll()

        if(genders.length < 1){
            const {data}= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            
            const allGenders=data.results
            await Gender.bulkCreate(allGenders.map((Element)=>({name:Element.name})))
            genders= await Gender.findAll()
            res.status(201).json({genders:genders})
        }
        else{

            res.status(200).json({genders:genders})
        }
        
        
    } catch (error) {
        res.status(500).json({message:"Hubo un error al obtener los generos: " + error.message})
    }
}
module.exports=getGenders