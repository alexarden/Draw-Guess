import Canvas from "../Canvas/Canvas";
import SendDrawingButton from "../../features/drawing/SendDrawingButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setWord } from "../../features/word/wordSlice";


export default function Draw() {
  const word = useSelector((state) => state.word.word);
  const dispatch = useDispatch();

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
      <SendDrawingButton />
    </>
  );
}
