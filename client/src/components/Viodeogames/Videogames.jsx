
import "./Videogames.css"
import Videogame from "../Videogame/Videogame";
export default function Videogames({videogames}){
  

    return(<>
    <div className="games-grid">

        {videogames.map((game)=>{
            if(game.id){
                game.genders=game.genres.map((Element)=>Element.name)
                
            }
             const genders=game.genders.join(" ")
            return(
                
                <Videogame image={game.image || game.background_image} genders={genders} name={game.name}/> 
                
                )
            })}
    </div>
        
        </>)
    
}