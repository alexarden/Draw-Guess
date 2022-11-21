import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function DrawHallway(){
    const navigate = useNavigate()

    const handleClick = () => { 
        navigate('draw');
    }


  return <button onClick={handleClick}>Continue</button>
}