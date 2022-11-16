import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setDrawing } from "./drawingSlice";

const Counter = () => {
  const drawing = useSelector((state) => state.draw.drawing); 
  const dispatch = useDispatch();

  // Send drawing data to web socket server.

  return (
    <div>
      <button onClick={handleClick}>Send Drawing</button>
    </div> 
  ); 
};

export default Counter;
