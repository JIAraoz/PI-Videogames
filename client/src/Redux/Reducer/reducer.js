import { FILTER, ORDER_ALPHABETICAL, ORDER_RATING,LOAD_GAMES} from "../Actions/ActionsType";

const initialState={
    videogames:[],
    allVideogames:[]
   
}
function reducer(state=initialState,action){
    switch(action.type){
        case FILTER:
            if(action.payload==="DB GAMES"){
                const miVideogames=state.videogames.filter(game => game.uuid)
                return{...state,videogames:miVideogames}
            }
            else if(action.payload==="API GAMES"){
                const miVideogames=state.videogames.filter(game => game.id)
                return{...state,videogames:miVideogames}
            }
            break
        case ORDER_ALPHABETICAL:
            if(action.payload==="A-Z"){
                const miVideogames=state.videogames
                miVideogames.sort((a, b) => {
                    
                    return a.name.localeCompare(b.name);
                  })
                return{
                    ...state,
                    videogames:miVideogames
                }
            }
            else if(action.payload==="Z-A"){
                const miVideogames=state.videogames
                miVideogames.sort((a,b)=>{
                    return b.name.localeCompare(a.name)
                })
                return{
                    ...state,
                    videogames:miVideogames
                }
            }
            break
        case ORDER_RATING:
            if(action.payload==="Ascendente"){
                const miVideogames=state.videogames
                miVideogames.sort((a, b) => a.rating - b.rating)
                return{
                    ...state,videogames:miVideogames
                }
            }
            else if(action.payload==="Descendente"){
                const miVideogames=state.videogames
                miVideogames.sort((a, b) => b.rating - a.rating)
                return{
                    ...state,videogames:miVideogames
                }
            }
            break
        case LOAD_GAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
              }
            
        default:
            return{
                ...state
            }
    }
}