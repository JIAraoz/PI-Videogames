import './Videogame.css'
import { Link } from 'react-router-dom'
export default function Videogame({image,name,genders,id=0}){
    
    return(

        <Link to={`/detail/${id}`}className='card' >

        
            <div className='image-container'><img src={image} alt={name} /></div>
            <h3>{name}</h3>
            <span>{genders}</span>
        
        </Link>
    )
}