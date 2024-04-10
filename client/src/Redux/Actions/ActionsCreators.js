import axios from "axios"
import { ORDER_RATING,ORDER_ALPHABETICAL ,FILTER,LOAD_GAMES} from "./ActionsType"
export function OrderAlphabetical(typeOfOrder){
    return{
        type:ORDER_ALPHABETICAL,
        payload:typeOfOrder
    }
}
export function Filter(typeOfFilter){
return{
    type:FILTER,
    payload:typeOfFilter
}
}
export function OrderRating(typeOfOrder){
    return{
        type:ORDER_RATING,
        payload:typeOfOrder
    }
}

export const loadGames = (page) => {
  return async (dispatch) => {
    try {
      
     const {data}= await axios.get(`http://localhost:3001/videogames?page=${page}`)

      
      dispatch({
        type: LOAD_GAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
