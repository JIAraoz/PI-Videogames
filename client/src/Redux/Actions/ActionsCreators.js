import axios from "axios"
import {   ORDER,FILTER,LOAD_GAMES,LOAD_NAME} from "./ActionsType"

export function Order(typeOfOrder){
    return{
        type:ORDER,
        payload:typeOfOrder
    }
}
export function Filter(typeOfFilter){
return{
    type:FILTER,
    payload:typeOfFilter
}
}


export const loadGames = () => {
  return async (dispatch) => {
    try {
      
     const {data}= await axios.get(`http://localhost:3001/videogames`)
      
      
      dispatch({
        type: LOAD_GAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const loadName = (name) => {
  return async (dispatch) => {
    try {
      
     const {data}= await axios.get(`http://localhost:3001/videogamesByName?name=${name}`)
      
      
      dispatch({
        type: LOAD_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
