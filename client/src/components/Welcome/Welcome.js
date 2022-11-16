import {Link } from "react-router-dom";

export default function Welcome(){
return (
    <>
    
    <h2>Welcome!</h2> 

    <Link to='/choose-word'>PLAY</Link>  

    {/* If you are the second player you will be redirected to Guess page. */}

    {/* <Link to='/Guess'>PLAY</Link>  */}
    
    </>
)


}