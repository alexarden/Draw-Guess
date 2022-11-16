import { useEffect, useState, useRef } from "react";
import CanvasDraw from 'react-canvas-draw'; 
import style from './Canvas.module.scss';

export default function Canvas() {

  const [size, setSize] = useState(200)

  const canvasRef = useRef(null)

  const canvasChange = function handleCanvasChange() {
    const canvas = canvasRef.current;
    const drawings = canvas.getSaveData();
    console.log(drawings); 
  }

  useEffect(() => {
    const height = window.innerHeight
    const width = window.innerWidth
    const fixedSize = height > width ? height * 0.7 : width * 0.7  
    setSize(fixedSize);
  },[size])   


  return (
      <CanvasDraw
        className={style.canvas} 
        lazyRadius={0}
        brushColor={'black'}
        brushRadius={5}
        canvasWidth={size}
        canvasHeight={size}  
        ref={canvasRef}
        disabled={false}
        onChange={canvasChange}
      />
  );
}
