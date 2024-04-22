import { useState } from "react"
import './SearchBar.css'
import { loadName } from "../../Redux/Actions/ActionsCreators"
import { useDispatch } from "react-redux"

export default function SearchBar({setCurrentPage}){
    const dispatch=useDispatch()
const [name,setName]=useState("")


async function handleClick(e){
    if(name!==""){
        dispatch(loadName(name))
        setCurrentPage(1)
    }else alert("Debes ingresar un nombre valido")
}
    return(
        <div className="search-bar">

        <input type="text" onChange={(e)=>setName(e.target.value)}/>
        <button onClick={handleClick} className="search-bar-btn">Buscar</button>
        </div>
    )
}