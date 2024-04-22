import './FormPage.css'
import validation from './validation/validation';
import axios from 'axios'
import { useState, useEffect } from "react";
import plusWhite from './static/plusWhite.png'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { loadGames } from '../../Redux/Actions/ActionsCreators';
export default function FormPage(){
  const dispatch=useDispatch()
  const platforms=['PC','Nintendo','PlayStation','Android','Web']
  const [errors,setErrors]=useState({})


  const [selects, setSelects] = useState({
    selectedGender:"",
    selectedPlatform:""
  }); 
  const [genders,setGenders]=useState({
    genders:[]
  })
  useEffect(()=>{
    async function loadGenders(){
      try {
        const {data}= await axios("http://localhost:3001/genders")
      setGenders({genders:data.genders})
      } catch (error) {
        console.log(error.message);
      }
  }
  loadGenders()
  },[])
  const [gameData,setGameData]=useState(
    {name:"",
    description:"",
    platforms:[],
    genders:[]
    ,imagen:"",
    rating:"",
    release_date:""
    }
  ) 

  
  

 const handleSubmit = (e) => {
  
   e.preventDefault()
   
   if (Object.keys(validation(gameData)).length ===0) {
     axios.post("http://localhost:3001/videogames", gameData)
     .then(() => {
        alert("Personaje creado con éxito");
        dispatch(loadGames())
      })
      .catch((error) => {
        alert(error.response.data.message)
      });
    } else {
      setErrors(validation(gameData))
      alert("Por favor, corrige los errores antes de enviar el formulario");
    }
    
    
    console.log(Object.keys(errors));
  };
 


  const handleAddTag = (e) => {
   e.preventDefault()
   if (selects.selectedGender) { 
     setGameData((prevGameData) => {
       if (!prevGameData.genders.includes(selects.selectedGender)) {
         
         return { ...prevGameData, genders: [...prevGameData.genders, selects.selectedGender] };
        }
        return prevGameData;
      })
      setSelects({...selects,selectedGender:""});
      
    }
    
      if (selects.selectedPlatform) { 
        if (!gameData.platforms.includes(selects.selectedPlatform)) {
          
          setGameData({...gameData,platforms:[...gameData.platforms,selects.selectedPlatform]});
          setSelects({...selects,selectedPlatform:""});
          
        }
        setSelects({...selects,selectedPlatform:""});
        
      }
      
    
  }  
  
  
  
  
  const handleRemoveTag = (e,indexToRemove) => {
   
    if(e.target.attributes.name.nodeValue==='tag-platform'){
      setGameData({...gameData,platforms:gameData.platforms.filter((_, index) => index !== indexToRemove)})
      
    
    }
    else if(e.target.attributes.name.nodeValue==='tag-gender'){
      setGameData({...gameData,genders:gameData.genders.filter((_,index)=>index!==indexToRemove)})
      
    }
   
  };
   
  
  return (<div className='form-page'>

    <form >
      <div className='left-form'>

      <h1>Crea tu videojuego</h1>


      <h2>Selecciona un imagen de portada (url)</h2>
     <div className='main'>
     <div className="input-imagen">
      <input type="text" name="imagen" placeholder='url..' onChange={(e)=>{ setErrors(validation({...gameData,imagen:e.target.value}));setGameData((prevGameData)=>({...prevGameData,imagen:e.target.value}))}} />
        <span className='error'>{errors.imagen}</span>
        <label htmlFor="imagen" className="image-label">
            {gameData.imagen ? <img src={gameData.imagen} alt="Imagen Juego" className="game_selected" />:<img src={plusWhite} alt="Seleccionar imagen" className="select" />} 
        </label>

      </div>


      <div className="form-txt">
        <h2>Ponle un nombre</h2>
        <label htmlFor="name" className='name'>
         
          <input type="text" placeholder="Nombre.." id="name" name="name" value={gameData.name} onChange={(e)=>{  setErrors(validation({...gameData,name:e.target.value})) ;setGameData((prevGameData)=>({...prevGameData,name:e.target.value}))}}/>
          <span className='error'>{errors.name}</span>
        </label>
        <h2>Añade una descripción</h2>
        <label htmlFor="Description">
         <textarea  className="Description"name="description" id="Description"  placeholder="Descripción breve.." onChange={(e)=>{setErrors(validation({...gameData,description:e.target.value}));setGameData((prevGameData)=>({...prevGameData,description:e.target.value}))}}></textarea>
         <span className='error'>{errors.description}</span>
       </label>
      </div>

     </div>
      </div>
    <div className='right-form'>

    <div className="tags-genders">
      <h2>Agrega Géneros</h2>
    <select
        value={selects.selectedGender}
        onChange={(e) => setSelects({...selects,selectedGender:e.target.value})}
        name='gender'>
        <option value="">Selecciona un género</option>
        
        {genders.genders.map((element)=><option value={element.name} key={element.uuid}>{element.name}</option>)}
        
        
      </select>
      <button onClick={handleAddTag} className='add'>Agregar</button>
      <div className="tag-container">
        {gameData.genders.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <span
              name='tag-gender'
              className="tag-remove"
              onClick={(e) => handleRemoveTag(e,index)}
              >
              &times;
            </span>
          </div>
        ))}
      </div>
        <span className='error'>{errors.genders}</span>
    </div>


    <div className="tags-platforms">
      <h2>Agrega plataformas</h2>
    <select
        value={selects.selectedPlatform}
        onChange={(e) => setSelects({...selects,selectedPlatform:e.target.value})} 
        name='platform'>
        <option value="">Selecciona las plataformas</option>
        
        {platforms.map((element)=><option value={element} key={element}>{element}</option>)}
        
        
      </select>
      <button onClick={handleAddTag} className='add'>Agregar</button>
      <div className="tag-container">
        {gameData.platforms.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <span
              name='tag-platform'
              className="tag-remove"
              onClick={(e) => handleRemoveTag(e,index)}
              >
              &times;
            </span>
          </div>
        ))}
      </div>
      <span className='error error-platform'>{errors.platforms}</span>
    </div>





    <div className='rating'>

    <h2 >Ponle una puntuación a tu juego</h2>
    <input  className="rating-input" type="number" onChange={(e)=>{setErrors(validation({...gameData,rating:e.target.value}));setGameData({...gameData,rating:parseFloat(e.target.value)})}}/>
    <span className='error' >{errors.rating}</span>
    </div>

    
    <h3>Fecha de lanzamiento</h3>
    <input type="date"  max={new Date().toISOString().split('T')[0]} onChange={(e)=>setGameData({...gameData,release_date:e.target.value})} />
    
    <input type="submit"  className="submit" value={"Crear"} onClick={handleSubmit}/>
    <Link to={"/home"} className='btn-home'> <button> Home</button> </Link>
        </div>
        </form>
      
        </div>
      )} 

 
  
