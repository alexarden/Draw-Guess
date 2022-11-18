import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setWord } from "../../features/word/wordSlice";
import { setTurn } from "../../features/turn/turnSlice";

export default function NotFound(){

    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('turn') === '1'){
            sessionStorage.setItem('turn', '2') 
            sessionStorage.setItem('word', '')
            setWord('')
            setTurn(2)   
            navigate('/draw');  
        }
    })

    return <div>
        <h1>Sorry, page not found...</h1>
    </div> 
}