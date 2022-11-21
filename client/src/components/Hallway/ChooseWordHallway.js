import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function ChooseWordHallway(){
    const navigate = useNavigate()

    const handleClick = () => { 
        navigate('chooseWord');  
    } 


  return <button onClick={handleClick}>Continue</button>
}