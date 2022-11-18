import {useEffect, useState} from 'react'; 
import { Routes, Route, Outlet, Link } from "react-router-dom"; 
import Welcome from './Welcome/Welcome'; 
import ChooseWord from './ChooseWord/ChooseWord';  
import Draw from './Draw/Draw'; 
import Loading from './Loading/Loading'; 
import NotFound from './NotFound/NotFound'; 
import style from './App.module.scss';  
import {socket} from '../service/socket.js';

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
 
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
    
      <div>
        <h1>Draw & Guess</h1>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path='/chooseWord' element={<ChooseWord/>}></Route> 
          <Route path='/draw' element={<Draw/>}></Route> 
          <Route path='/loading' element={<Loading/>}></Route> 
          <Route path='*' element={<NotFound/>}></Route>  
        </Routes>
      </div>
    
  );
}



export default App;
