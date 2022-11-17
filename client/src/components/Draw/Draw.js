import Canvas from "../Canvas/Canvas";
import Loading from "../Loading/Loading"; 
import SendDrawingButton from "../../features/drawing/SendDrawingButton";
import { useSelector, useDispatch } from "react-redux";
import { setWord } from "../../features/word/wordSlice";
import { useEffect, useState } from "react";
import {socket} from "../../service/socket.js";
import { setTurn } from "../../features/turn/turnSlice";


export default function Draw() {
  const drawing = useSelector((state) => state.draw.drawing); 
  const turn = useSelector((state) => state.turn.turn); 
  const word = useSelector((state) => state.word.word);
  const dispatch = useDispatch();
  
  const [drawingSent, setDrawingSent] = useState(false);
  const [canAnswer, setCanAnswer] = useState(false);  

  function handleSendClick(){
    socket.emit('drawing', drawing);
    socket.emit('connections');  
    socket.emit('can-answer');
    setDrawingSent(true);
  }

  useEffect(() => {

    if (sessionStorage.getItem("turn") === null) {
      sessionStorage.setItem("turn", JSON.stringify(turn.payload));
    }else{
        const length = sessionStorage.getItem('turn').length -1
        const turn = Number(sessionStorage.getItem('turn').substring(1,length))
        dispatch(setTurn(turn));  
    } 
   
    if (sessionStorage.getItem("word") === null) {
      sessionStorage.setItem("word", JSON.stringify(word.payload));
    }else{
        const length = sessionStorage.getItem('word').length -1
        const word = sessionStorage.getItem('word').substring(1,length)
        dispatch(setWord(word));  
    } 
    console.log('word ', word);  
    console.log('turn ', turn); 
    socket.on('allow-to-answer', () => {
      setCanAnswer(true) 
    })
    
  },[]); 

  

  return (
    <>
      {turn.payload === 1 ? ( 
        drawingSent ? (
          <div>
          <div>Waiting for answer...</div>
          <Loading /> 
          <SendDrawingButton 
          handleSendClick={handleSendClick} 
          drawingSent={drawingSent}/>
        </div> 
        ) : (
          <div>
          <div>Draw {word.payload} !</div> 
          <Canvas/>
          <SendDrawingButton 
          handleSendClick={handleSendClick} 
          drawingSent={drawingSent} />
        </div>
       )) : (<div>
        <div>Waiting for drawing</div>
        <Canvas/>
        <input disabled={!canAnswer}></input>  
         </div>) } 
     
    </>
  );
}
