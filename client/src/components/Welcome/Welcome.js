import { socket } from "../../service/socket";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTurn } from "../../features/turn/turnSlice";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.turn.turn);
  const [players, setPlayers] = useState(1); 
  const navigate = useNavigate();
  let savedTurn = 0;

  useEffect(() => {
    if (turn.payload === null && sessionStorage.getItem("turn") === null) {
      socket.emit("connections");
      socket.on("connections-from-server", (connections) => {
        setPlayers(connections);
        if (sessionStorage.getItem("turn") === null) {
          sessionStorage.setItem("turn", JSON.stringify(connections));
        }
        dispatch(setTurn(Number(sessionStorage.getItem("turn"))));
      });
    } else if (turn.payload === null) {
      savedTurn = sessionStorage.getItem("turn");
      dispatch(setTurn(Number(savedTurn)));
    }

    console.log('players ', players); 
  }, []);

  function handleCheckPlayersclick() {
    socket.emit("connections");
    socket.on('connections-from-server', (data)=>{
      setPlayers(data) 
    }) 
  }

  return (
    <>
      <h2>Welcome Player {turn.payload} !</h2>

      {turn.payload === 1 ? (
        players === 1 ? (
          <div>
            <div>Wait for second player...</div>
            <button onClick={handleCheckPlayersclick}>
              Check for other players
            </button>
          </div>
        ) : (
          <Link to="/chooseWord">PLAY</Link>
        )
      ) : (
        //  
        navigate('/draw')  
      )}


    </>
  );
}
