import Canvas from "../Canvas/Canvas";
import Loading from "../Loading/Loading"; 
import style from './Draw.module.scss'; 
import SendDrawingButton from "../../features/drawing/SendDrawingButton";
import { useSelector, useDispatch } from "react-redux";
import { setWord } from "../../features/word/wordSlice";
import { useEffect, useState } from "react";
import {socket} from "../../service/socket.js";
import { setTurn } from "../../features/turn/turnSlice";
import { useNavigate } from "react-router-dom";


export default function Draw() {
  const drawing = useSelector((state) => state.draw.drawing); 
  const turn = useSelector((state) => state.turn.turn); 
  const word = useSelector((state) => state.word.word);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [drawingSent, setDrawingSent] = useState(false);
  const [canAnswer, setCanAnswer] = useState(false); 
  const [answerInputValue, setAnswerInputValue] = useState('');
  const [styleAfterAnswer, setAfterAnswer] = useState('')

  function handleSendClick(){
    socket.emit('drawing', drawing);
    socket.emit('connections');  
    socket.emit('can-answer');
    setDrawingSent(true);
    navigate('/loading');
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
        const word = sessionStorage.getItem('word'); 
        dispatch(setWord(word));  
    } 

    // Server requests.
    socket.on('allow-to-answer', () => {
      setCanAnswer(true) 
    })

    socket.on('get-word', (data) => {
      sessionStorage.removeItem('word');
      sessionStorage.setItem('word', data);
    }) 

    socket.on('switch', () => {
      console.log(sessionStorage.getItem('turn'));  
      if(sessionStorage.getItem('turn') === '2'){ 
        setWord('')
        setTurn(1)  
        navigate('/chooseWord');  
        sessionStorage.removeItem('turn') 
        sessionStorage.removeItem('word')  
        
      }else if(sessionStorage.getItem('turn') === '1'){    
        navigate('/8');   
      } 
    }) 

  },[]); 

  function handleAnswerSubmit(e){
    e.preventDefault() 
    if(answerInputValue === sessionStorage.getItem('word')){

      setAfterAnswer(style.right) 
      socket.emit('switch-turn') 
      console.log(turn.payload); 
      // Switch turn for players. 
      // if(turn.payload === 2 ){ 
      //   setWord('');
      //   setTurn(1);
      //   sessionStorage.removeItem('word');
      //   sessionStorage.removeItem('turn');
      //   sessionStorage.setItem('turn', '1');
      //   navigate('/chooseWord');
      // }else if(turn.payload === 1){
      //   setWord('');
      //   setTurn(2);
      //   sessionStorage.removeItem('word');
      //   sessionStorage.removeItem('turn');
      //   sessionStorage.setItem('turn', '2');
      //   navigate('/draw');
      // }  

      // Reset word for players.

      // If guesser navigate to work pick.

      // If drawer navigate to waiting fro drawing.

    }else{
      setAfterAnswer(style.wrong); 
      setAnswerInputValue(''); 
    } 
    
  }

  function handleInputChange(e){
    setAnswerInputValue(e.target.value)

  } 

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
          <div>Draw a {word.payload.substring(1,word.payload.length -1)}</div>   
          <Canvas/>
          <SendDrawingButton 
          handleSendClick={handleSendClick} 
          drawingSent={drawingSent} />
        </div>
       )) : (<div>
        <div>Waiting for drawing</div>
        <Canvas/>
        <form onSubmit={handleAnswerSubmit}>
        <input 
        className={styleAfterAnswer}
        disabled={!canAnswer}
        value={answerInputValue}
        onChange={handleInputChange}
        /> 
        </form>
        </div>) } 
    </>
  );
}
