import {Link} from "react-router-dom"
export default function LandingPage(){
    return(<>
        <Link to={"/home"}>
            <button className="btn-home">Home</button>
        </Link>
    </>
    )
}