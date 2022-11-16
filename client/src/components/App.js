import {useEffect, useState} from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Canvas from './Canvas/Canvas.js'; 
import style from './App.module.scss';  
import Drawing from '../features/drawing/SendDrawingButton'; 
import {socket} from '../service/socket.js';

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

    socket.on('drawing-from-server', (data) => {  
      console.log(data);
    })

    socket.on('connections-from-server', (data) => {
      console.log(data); 
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('drawing-from-server'); 
    };
  }, []);
  

  return ( 
    <BrowserRouter>
      <p>Connected: { '' + isConnected }</p> 
      <Canvas/>   
      <Drawing/>
    </BrowserRouter>
  );
}

export default App;
