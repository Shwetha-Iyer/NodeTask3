import {Link} from "react-router-dom";
export default function Main(){
    return <>
    <div>
        <h1 className="heading"> URL SHORTNER </h1>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-6 my-5">
                <img src="../urlshortner.jpg" width="100%" alt="urlimg"/>
            </div>
            <div className="col-md-6 my-5 text-center"> <br/>
                <button className="btn btn-warning my-5 btn-main"><Link to="/login" className="text-color">Login</Link></button> <br/> 
                <button className="btn btn-warning my-5 btn-main"><Link to="/signup" className="text-color">Sign Up</Link></button>
            </div>
        </div>

    </div>
    </>
}