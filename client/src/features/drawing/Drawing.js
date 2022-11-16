import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const drawing = useSelector((state) => state.draw.drawing); 
 
  // Send drawing data to web socket server.
  function handleClick(drawing){
    
  }

  return (
    <div>
      <button onClick={handleClick}>Send Drawing</button>
    </div> 
  ); 
};

export default Counter;
