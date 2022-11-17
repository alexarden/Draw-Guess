import Canvas from "../Canvas/Canvas";
import SendDrawingButton from "../../features/drawing/SendDrawingButton";
import { useSelector, useDispatch } from "react-redux";
import { setWord } from "../../features/word/wordSlice";
import { useEffect, useState } from "react";
import {socket} from "../../service/socket.js";


export default function Draw() {
    const drawing = useSelector((state) => state.draw.drawing); 
  const word = useSelector((state) => state.word.word);
  const dispatch = useDispatch();

  const [drawingSent, setDrawingSent] = useState(false);

  function handleSendClick(){
    socket.emit('drawing', drawing);
    socket.emit('connections');
    setDrawingSent(true);
    console.log('click!');
      
 
  }

  useEffect(() => {
    // console.log(localStorage.getItem("word")); 
    if (localStorage.getItem("word") === null) {
      localStorage.setItem("word", JSON.stringify(word.payload));
    }else{
        const length = localStorage.getItem('word').length -1
        const word = localStorage.getItem('word').substring(1,length)
        dispatch(setWord(word)); 
    } 
    console.log(word);  
  },[]); 

  return (
    <>
      <div>Draw a {word.payload} </div>
      <Canvas />
      <SendDrawingButton handleSendClick={handleSendClick} drawingSent={drawingSent}/>
    </>
  );
}
