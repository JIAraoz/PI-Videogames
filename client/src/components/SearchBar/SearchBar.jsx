import { useState } from "react"
import './SearchBar.css'
import { loadName } from "../../Redux/Actions/ActionsCreators"
import { useDispatch } from "react-redux"

export default function SearchBar(){
    const dispatch=useDispatch()
const [name,setName]=useState("")


async function handleClick(){
    dispatch(loadName(name))
}
    return(
        <div className="search-bar">

        <input type="text" onChange={(e)=>setName(e.target.value)}/>
        <button onClick={handleClick} className="search-bar-btn">Buscar</button>
        </div>
    )
}