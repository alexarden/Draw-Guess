import { configureStore } from "@reduxjs/toolkit";
import drawingReducer from '../features/drawing/drawingSlice';
import wordReducer from '../features/word/wordSlice'; 
import turnReducer from "../features/turn/turnSlice";  


export const store = configureStore({
    reducer: {
        draw: drawingReducer,
        word: wordReducer,
        turn: turnReducer
    }
})