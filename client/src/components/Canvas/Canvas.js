import { useEffect, useState, useRef } from "react";
import CanvasDraw from 'react-canvas-draw'; 

function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

export default function Canvas() {

  const [size, setSize] = useState(0)

  const canvasRef = useRef(null)

  const deboundCanvasChange = function handleCanvasChange() {
    const canvas = canvasRef.current;
    const drawings = canvas.getSaveData();


  }

  useEffect(() => {
    const height = window.innerHeight
    const width = window.innerWidth
    const fixedSize = height > width ? height : width
    setSize(fixedSize);
  },[size])   


  return (
      <CanvasDraw
        lazyRadius={0}
        brushColor={'black'}
        brushRadius={5}
      />
  );
}
