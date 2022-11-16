import { useEffect, useState, useRef } from "react";
import CanvasDraw from 'react-canvas-draw'; 
import style from './Canvas.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { setDrawing } from "../../features/drawing/drawingSlice";

function getSize(height,width){
  
  return [height * 0.8, width * 0.9] 
 
} 

export default function Canvas() {


  const drawing = useSelector((state) => state.draw.drawing); 
  const dispatch = useDispatch();

  const [size, setSize] = useState([200,200])

  const canvasRef = useRef(null)

  function handleCanvasChange() {
    const canvas = canvasRef.current;
    const drawings = canvas.getSaveData();
    dispatch(setDrawing(drawings)); 
    console.log(drawing);
    console.log(drawings);
  }

  function getWindowSize(){
    const height = window.innerHeight
    const width = window.innerWidth
    const fixedSize = getSize(height, width);     
    setSize(fixedSize); 
  }

  useEffect(() => {
    getWindowSize()
  },[])   

  useEffect(() => {
    window.addEventListener('resize', () => {
      handleCanvasChange(); 
      getWindowSize();
    });

    return () => {
      window.removeEventListener('resize', () => {console.log('resize removed')})
    }; 
       
   },[]);  

  

  return (
      <CanvasDraw
        className={style.canvas} 
        lazyRadius={0}
        brushColor={'black'}
        brushRadius={5}
        canvasHeight={size[0]}    
        canvasWidth={size[1]}
        ref={canvasRef}
        disabled={false}
        onChange={handleCanvasChange}
      />
  );
}
