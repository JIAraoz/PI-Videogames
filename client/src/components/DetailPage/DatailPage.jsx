import './DetailPage.css'
import { useDispatch } from 'react-redux'
import { loadGames } from '../../Redux/Actions/ActionsCreators'
import { Link } from 'react-router-dom'
import star from './static/star.png'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function DetailPage(){
    const {id}=useParams()
    const dispatch=useDispatch()
   const [game,setGame]=useState()
   const [platforms,setPlatforms]=useState()
   const [gender,setGender]=useState()
    useEffect(()=>{
        dispatch(loadGames())
 axios.get(`http://localhost:3001/videogames/${id}`).then(({data})=>{
      
      
    
        const platforms=data.platforms.map((Element)=>Element.name)
        console.log(platforms);
        const gender=data.Genders.map((Element)=>Element.name)
        setPlatforms(platforms)
        setGender(gender) 
        setGame(data)
        console.log(data);
      
   

 }).catch((err)=>{
    console.log(err);
 })
            
        
        
        
    },[id])
    
    return(
    <>
        {game ? (<>
    <div className="detail">
            <div className='left_side'>

                <h3>{game.name}</h3>
                <span>Description</span>
                <p>{game.description}</p>
                <span>Gender</span>
                <div className='genders'>

                {
                    gender.map((gender,index)=>{
                        return(
                            <p className='gender' key={index}>{gender}</p>
                            )
                        })
                    }
                </div>
                <span>Platforms</span>
                <div className='platforms'>

                {
                    platforms.map((platform, index)=>{
                        return(
                            <p className='platform'key={index}>{platform}</p>
                            )
                        })}
                        </div>
                <span>Rating: {game.rating} <img src={star} alt="rating" className='rating-star' /></span>
                <Link to={"/home"}><button className='home-detail' >Home</button></Link>
            </div>
            <div className='right-side'><img src={game.imagen} alt="" srcset="" /></div>
            </div>
        </>

        ):(<>
        <div className='spin-star'>
            <img src={star} alt="Cargando.." />
        </div>
        </>)} 
        
       
    </>
    )
}

