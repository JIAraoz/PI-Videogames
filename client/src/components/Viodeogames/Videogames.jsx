import { useSelector } from "react-redux";
import { useState } from "react";

export default function Videogames(){
    const videogames=useSelector((state)=>state.videogames)
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 9;
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentgames = videogames.slice(indexOfFirstGame, indexOfLastGame)
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return(<>
        {currentgames.map((game)=>{
            return(
                
                 <h1>soy un juego {game.uuid||game.id}</h1>   
                
            )
        })}
        <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={nextPage} disabled={indexOfLastGame >= videogames.length}>Siguiente</button>
        </div>
        </>)
    
}