import { socket } from "../../service/socket";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTurn } from '../../features/turn/turnSlice';

export default function Welcome() {
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.turn.turn);
  const [refresher, setRefresher] = useState(true);
  const [players , setPlayers] = useState(0)
  let savedTurn = 0

  useEffect(() => {
  
    console.log('Turn A' , turn.payload); 
    if(turn.payload === null && sessionStorage.getItem('turn') === null){
        socket.emit("connections");
        socket.on("connections-from-server", (connections) => {
          console.log("Connections ", connections);
          setPlayers(connections)
          if(sessionStorage.getItem('turn') === null){
            sessionStorage.setItem('turn', JSON.stringify(connections));
          }
          dispatch(setTurn(Number(sessionStorage.getItem('turn'))));   
        });
        console.log("Turn B", turn);
    }else if(turn.payload === null){
        savedTurn = sessionStorage.getItem('turn')  
        dispatch(setTurn(Number(savedTurn)));
        console.log('Saved turn ', savedTurn);  
    }  
   
  }, []);

  function handleCheckPlayersclick(){
    socket.emit('connections')
  } 

  return (
    <>
      <h2>Welcome Player {turn.payload} !</h2>    

      {turn.payload === 1 ?   
       (players === 1 ?
       <div>
        <div>Wait for second player...</div>
        <button onClick={handleCheckPlayersclick}>Check for other players</button> 
       </div> : 
       <Link to='/chooseWord'>PLAY</Link> ) : (
       <Link to='/draw'>Continue</Link>  
       )
      }
      
     
     
      {/* If you are the second player you will be redirected to Guess page. */}

      {/* <Link to='/Guess'>PLAY</Link>  */}
    </>
  );
}
