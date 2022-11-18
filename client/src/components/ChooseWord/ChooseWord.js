import randomWords from "random-words";
import { useSelector, useDispatch } from "react-redux";
import { setWord } from "../../features/word/wordSlice";
import { Link } from "react-router-dom";
import {socket} from '../../service/socket'
import { useEffect } from "react";

export default function ChooseWord() {

  useEffect(() => {
    if(!sessionStorage.getItem('turn')){
      sessionStorage.setItem('turn', '1'); 
    } 
  })

  const word = useSelector((state) => state.word.word);
  const dispatch = useDispatch();

  const handleEasyClick = (e) => {
    handleClick(3);
  };
  const handleMedClick = () => {
   handleClick(4);
  };
  const handleHardClick = () => {
    handleClick(5,12); 
  };

  function handleClick(length, maxLength){
    if (sessionStorage.getItem("word") !== null) {
      sessionStorage.removeItem("word");
    }
    let word = [""];
    while (word[0].length < length) {
      word = randomWords({ exactly: 1, maxLength: maxLength || length });
    }
    console.log(word[0].length, word[0]);
    dispatch(setWord(word[0]));
    socket.emit('word',word[0])
  }

  return (
    <>
      <h2>Choose Difficulty</h2>

      <Link to="/draw">
        <button onClick={handleEasyClick}>EASY</button>
      </Link>
      <Link to="/draw">
        <button onClick={handleMedClick}>MEDIUM</button>
      </Link>
      <Link to="/draw">
        <button onClick={handleHardClick}>HARD</button>
      </Link>
    </>
  );
}
