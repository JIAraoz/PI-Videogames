import { FILTER, ORDER ,LOAD_GAMES, LOAD_NAME, FILTER_GENDERS} from "../Actions/ActionsType";

const initialState={
    videogames:[],
    allVideogames:[]
   
}
function reducer(state=initialState,action){
    
    switch(action.type){
         case FILTER:
            if(action.payload==="DB GAMES"){
                const miVideogames=state.allVideogames.filter(game => game.uuid)
                return{...state,videogames:miVideogames}
            }
            else if(action.payload==="API GAMES"){

                const miVideogames=state.allVideogames
                return{...state,videogames:miVideogames.filter(game => game.id)}
            }
            else if(action.payload==="All"){
                return{...state,videogames:state.allVideogames}
            }
            break 
    
        case LOAD_GAMES:
            
            
            return {
            
                videogames: action.payload,
                allVideogames: action.payload
              }
        case LOAD_NAME:
           
            return{
                ...state,videogames:action.payload
            }
        case ORDER:
            if(action.payload==="Rating +"){
                let copy=state.videogames.slice()
               
                copy.sort((a, b) => b.rating - a.rating)
                return{
                    ...state,
                    videogames:copy
                }
            }
            else if(action.payload==="Rating -"){
                let copy=state.videogames.slice()
               
                copy.sort((a, b) => a.rating - b.rating)
                return{
                    ...state,
                    videogames:copy
                }
            }
            else if(action.payload==="A-Z"){
                let copy=state.videogames.slice()
                copy.sort((a, b) => {
                    
                    return a.name.localeCompare(b.name);
                  })
                

                  
                return{
                    ...state,
                    videogames:copy
                } 
            }
            else if(action.payload==="Z-A"){
                let copy=state.videogames.slice()
                copy.sort((a, b) => {
                    
                    return b.name.localeCompare(a.name);
                  })
                

                  
                return{
                    ...state,
                    videogames:copy
                } 
            }
            else if(action.payload==="None"){
                return{
                    ...state,
                    videogames:state.allVideogames
                }
            }
            break
        case FILTER_GENDERS:
            if(action.payload==="All"){
                return{
                    ...state,
                    videogames:state.allVideogames
                }
            }
            else{const gender=action.payload
            
            
            const copy=state.videogames.filter((e)=>e.Genders.some(genero => genero.name === gender))
            
           
            return{
                ...state,
                videogames:copy
            }}

        default:
            return{
                ...state
            }
    }
}
export default reducer