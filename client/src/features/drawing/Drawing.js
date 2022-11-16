import { useSelector, useDispatch } from "react-redux";
import {socket} from "../../service/socket"; 

const Drawing = () => {
  const drawing = useSelector((state) => state.draw.drawing); 
 
  // Send drawing data to web socket server.
  function handleClick(){
    socket.emit('send-drawing', drawing) 
    // console.log(drawing); 
  }

  return (
    <div>
      <button onClick={handleClick}>Send Drawing</button>
    </div> 
  ); 
};

export default Drawing; 
