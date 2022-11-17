import { socket } from "../../service/socket";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTurn } from '../../features/turn/turnSlice';

export default function Welcome() {
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.turn.turn);

  useEffect(() => {
    console.log(turn.payload); 
    if(turn.payload === null && sessionStorage.getItem('turn') === null){
        socket.emit("connections");
        socket.on("connections-from-server", (data) => {
          console.log("Connections ", data);
          sessionStorage.setItem('turn', JSON.stringify(data));
          if(data === 1 && turn.payload === null){
            dispatch(setTurn(1));   
          }else if(data !== 1 && turn.payload === null){
            dispatch(setTurn(2));   
          }
        });
        console.log("Turn ", turn);
    }else if(turn.payload === null){
        const savedTurn = sessionStorage.getItem('turn');
        dispatch(setTurn(savedTurn));
        console.log('Saved turn ', savedTurn); 
    }  
  }, []);

  return (
    <>
      <h2>Welcome PLayer {turn.payload} !</h2>    

      <Link to="/choose-word">PLAY</Link>

      {/* If you are the second player you will be redirected to Guess page. */}

      {/* <Link to='/Guess'>PLAY</Link>  */}
    </>
  );
}
