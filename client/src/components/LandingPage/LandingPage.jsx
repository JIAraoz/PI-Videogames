import {Link} from "react-router-dom"
import './LandingPage.css'
export default function LandingPage(){
    return(<>
     <div className="landing-page">
        <div className="left-side">

            <h1 className="title">Videogames</h1>
        <Link to={"/home"} className="Link">
            <button className="button-home">START</button>
        </Link>
        </div>
        <div className="img">
            
        </div>
    </div> 
 
    </>
    )
}