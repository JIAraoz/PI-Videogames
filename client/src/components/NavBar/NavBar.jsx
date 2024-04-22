import { useDispatch } from "react-redux";
import axios from 'axios'
import { Order,Filter,FilterGenders } from "../../Redux/Actions/ActionsCreators";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './NavBar.css'
export default function NavBar({setCurrentPage}){
    const dispatch=useDispatch()
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
 
  const handleFilterGender=(e)=>{
 
    dispatch(FilterGenders(e.target.value))

  }


    const handleOrder=(e)=>{
        
        dispatch(Order(e.target.value))
     }
     const handleFilter=(e)=>{

        dispatch(Filter(e.target.value))
        setCurrentPage(1)
     }
     return(<> <nav className="nav-bar">
 <div className="brand">VIDEOGAMES</div>
      <Link to={"/form"} className="form-button"><button>Crea un videojuego</button></Link>
     <div className="nav-middle">

        <select  onChange={handleOrder} name="order" id="">
        <option value="">Ordenar</option>
        <option value="None">None</option>
        <option value="Rating +">Rating +</option>
        <option value="Rating -">Rating -</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        </select>
        <select  onChange={handleFilter}name="filter" id="">
            <option value="">Filtrar</option>
        <option value="All">All</option>
        <option  value="DB GAMES">DB GAMES</option>
        <option  value="API GAMES">API GAMES</option>
        
     </select>
     <select
        
        onChange={handleFilterGender}
        name='gender'>
        <option value="s">Selecciona un género</option>
        <option value="All">All</option>
        {genders.genders?.map((Element)=> <option value={Element.name} key={Element.uuid}>{Element.name}</option>)}
        
        
      </select>
    
     </div>
     <div className="nav-right">
      <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
     </div>
     </nav>

     </>
     )

}