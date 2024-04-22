
import "./Videogames.css"
import Videogame from "../Videogame/Videogame";

export default function Videogames({videogames}){
  

    return(<>
    <div className="games-grid">

        {videogames.map((game)=>{
            let Genders=[]
       
                Genders=game.Genders.map((Element)=>Element.name)
            
            Genders=Genders.join(" ") 
            return(
                
                <Videogame image={game?.imagen} genders={Genders} name={game?.name} key={game?.uuid||game?.id} id={game?.uuid||game?.id}/> 
                )
            })}
    </div>
        
        </>)
    
}