import NavBar from "../NavBar/NavBar";
import { useSelector} from "react-redux";
import {  useState} from "react";
import './HomePage.css'
import Videogames from "../Viodeogames/Videogames"

export default function HomePage(){
    function removeDuplicates(arr) {
        const seen = new Set();
        const result = [];
      
        for (const item of arr) {
            const identifier = item?.id || item?.uuid;
            if (!seen.has(identifier)) {
                seen.add(identifier);
                result.push(item);
            }
        }
      
        return result;
      }
   
    const videogames_raw=useSelector((state)=>state.videogames)
    const videogames=removeDuplicates(videogames_raw)
      
      
    const [currentPage, setCurrentPage] = useState(1);
   
    
    const gamesPerPage = 15;

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame);

  
    
    
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };


    return (
    <div className="Home">
    <NavBar setCurrentPage={setCurrentPage}></NavBar>
   <Videogames videogames={currentGames} />


    <div className="page_select">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={currentPage===7||currentGames.length<15 ||videogames.length<=15} >Siguiente</button>
    </div>    

    </div>
     )
}