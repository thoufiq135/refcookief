import "./home.css"
import { Link } from "react-router-dom";
function Home(){
    return(
        <>

<div class="container"></div>

        <Link to="/Login"> <button className="button">Login</button></Link>

        </>
    )
}
export default Home;