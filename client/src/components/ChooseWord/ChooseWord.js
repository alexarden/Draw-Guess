import randomWords from "random-words";
import { useSelector, useDispatch } from "react-redux";
import { setWord } from "../../features/word/wordSlice";
import { Link } from "react-router-dom";

export default function ChooseWord() {
  const word = useSelector((state) => state.word.word);
  const dispatch = useDispatch();

  const handleEasyClick = () => {
    console.log("easy");
    if (localStorage.getItem("word") !== null) {
        localStorage.removeItem("word");
    }
    let easyWord = [""];
    while (easyWord[0].length !== 3) {
      easyWord = randomWords({ exactly: 1, maxLength: 3 });
    }
    console.log(easyWord[0].length, easyWord[0]);
    dispatch(setWord(easyWord[0]));
    console.log(word);
  };
  const handleMedClick = () => {
    if (localStorage.getItem("word") !== null) {
        localStorage.removeItem("word");
      }
    let mediumWord = [""];
    while (mediumWord[0].length !== 4) {
      mediumWord = randomWords({ exactly: 1, maxLength: 4 });
    }
    console.log(mediumWord[0].length, mediumWord[0]);
    dispatch(setWord(mediumWord[0]));
  };
  const handleHardClick = () => {
    if (localStorage.getItem("word") !== null) {
      localStorage.removeItem("word");
    }
    let hardWord = [""];
    while (hardWord[0].length < 5) {
      hardWord = randomWords({ exactly: 1, maxLength: 12 });
    }
    console.log(hardWord[0].length, hardWord[0]);
    dispatch(setWord(hardWord[0]));
  };

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
