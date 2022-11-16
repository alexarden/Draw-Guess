import {useEffect, useState} from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Canvas from './Canvas/Canvas.js'; 
import style from './App.module.scss';  
import Drawing from '../features/drawing/Drawing'; 
import {socket} from '../service/socket';

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add(style.sizing);

    return () => {
      document.body.classList.remove(style.sizing); 
    };
  }, []);

  // Del
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
      console.log('pong'); 
    });

    socket.on('get-drawing', (data) => {
      console.log(data);
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('get-drawing'); 
    };
  }, []);
  //

  const sendPing = () => {
    socket.emit('ping');
  }

  return ( 
    <BrowserRouter>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button> 
      <Canvas/>   
      <Drawing/>
    </BrowserRouter>
  );
}

export default App;
