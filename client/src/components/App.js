import {useEffect, useState} from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Canvas from './Canvas/Canvas.js'; 
import style from './App.module.scss';  

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');  

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

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  return ( 
    <BrowserRouter>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button> 
      <Canvas/>   
    </BrowserRouter>
  );
}

export default App;
