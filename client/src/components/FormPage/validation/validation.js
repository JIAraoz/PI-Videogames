const regexUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
export default function validation(data){
    let errors={}
   
        if(!regexUrl.test(data.imagen)){
            errors.imagen="La url no es valida"
        }
   
    
        if(data.genders.length===0){
            errors.genders="Debes seleccionar al menos un genero"
        }
    
    
        if(data.platforms.length===0){
            errors.platforms="Debes seleccionar al menos un genero"
        }
    
 
        if(data.description.length===0||data.description.length<15||data.description.length>250){
           errors.description="Debes poner una descripción entre 15 a 250 caracteres"
        }
   
  
        if(data.name.length===0 || data.name.length>50){
            errors.name="El nombre debe de tener entre 15 a 50 caracteres"
        }
    
    
        if(data.rating<=0||data.rating>5){
            errors.rating="El rating debe estar entre 1 y los 5 puntos"
        }
    
    return errors
}