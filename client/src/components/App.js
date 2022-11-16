import {useEffect} from 'react'; 
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Canvas from './Canvas/Canvas.js'; 
import style from './App.module.scss'; 

function App() {

  useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add(style.sizing);

    return () => {
      document.body.classList.remove(style.sizing); 
    };
  }, []);

  return ( 
    <BrowserRouter>
      <Canvas/>   
    </BrowserRouter>
  );
}

export default App;
