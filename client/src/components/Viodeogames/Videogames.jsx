
import "./Videogames.css"
import Videogame from "../Videogame/Videogame";

export default function Videogames({videogames}){
  

    return(<>
    <div className="games-grid">

        {videogames.map((game)=>{
            let genders=[]
            if(game.id){
               
                genders=game.genres.map((Element)=>Element.name)
            }
            else if( game.uuid){
                genders=game.Genders.map((Element)=>Element.name)
            }
            genders=genders.join(" ") 
            return(
                
                <Videogame image={game.imagen|| game.background_image} genders={genders} name={game.name} key={game.uuid||game.id} id={game.uuid||game.id}/> 
                
                )
            })}
    </div>
        
        </>)
    
}