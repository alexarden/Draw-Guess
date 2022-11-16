import { useSelector, useDispatch } from "react-redux";
import {socket} from "../../service/socket.js"; 

const Drawing = () => {
  const drawing = useSelector((state) => state.draw.drawing); 
 
  // Send drawing data to web socket server.
  function handleClick(){
    socket.emit('drawing', drawing) 
    socket.emit('connections') 
    // console.log(drawing); 
  }

  return (
    <div>
      <button onClick={handleClick}>Send Drawing</button>
    </div> 
  ); 
};

export default Drawing; 
