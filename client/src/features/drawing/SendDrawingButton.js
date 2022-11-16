import { useSelector } from "react-redux";
import {socket} from "../../service/socket.js";
import style from '../../styles/Button.module.scss'; 

const SendDrawingButton = () => {
  const drawing = useSelector((state) => state.draw.drawing); 
 
  // Send drawing data to web socket server.
  function handleClick(){
    socket.emit('drawing', drawing) 
    socket.emit('connections') 
    
  }

  return (
    <div>
      <button className={style.button} onClick={handleClick}>Send Drawing</button>
    </div> 
  ); 
};

export default SendDrawingButton; 
