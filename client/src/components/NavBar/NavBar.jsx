import { useDispatch } from "react-redux";
import { Order,Filter } from "../../Redux/Actions/ActionsCreators";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import './NavBar.css'
export default function NavBar(){
    const dispatch=useDispatch()
    const handleOrder=(e)=>{
        
        dispatch(Order(e.target.value))
     }
     const handleFilter=(e)=>{
        dispatch(Filter(e.target.value))
     }
     return(<> <nav className="nav-bar">
 <div className="brand">VIDEOGAMES</div>
      <Link to={"/form"} className="form-button"><button>Crea un videojuego</button></Link>
     <div className="nav-middle">

        <select  onChange={handleOrder} name="order" id="">
        <option value="">Ordenar</option>
        <option value="None">None</option>
        <option value="Rating +">Rating +</option>
        <option value="Rating -">Rating -</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        </select>
        <select  onChange={handleFilter}name="filter" id="">
            <option value="">Filtrar</option>
        <option value="All">All</option>
        <option  value="DB GAMES">DB GAMES</option>
        <option  value="API GAMES">API GAMES</option>
        
     </select>
     </div>
     <div className="nav-right">
      <SearchBar></SearchBar>
     </div>
     </nav>

     </>
     )

}