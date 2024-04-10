
import { useSelector, useDispatch} from "react-redux";
import { useState,useEffect} from "react";
import './HomePage.css'
import Videogames from "../Viodeogames/Videogames"
import { loadGames } from "../../Redux/Actions/ActionsCreators";
export default function HomePage(){
    
    const dispatch=useDispatch()
    const videogames=useSelector((state)=>state.videogames)
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        dispatch(loadGames(currentPage))
    },[currentPage,dispatch])
    

    
    
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };


    return (
    <div className="Home">
    <h1 className="title-home">Bienvenido a Video games App</h1>
    <Videogames videogames={videogames}/>


    <div className="page_select">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={currentPage===7} >Siguiente</button>
    </div>    

    </div>
     )
}