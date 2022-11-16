import { configureStore } from "@reduxjs/toolkit";
import drawingReducer from '../features/drawing/drawingSlice';
import wordReducer from '../features/word/wordSlice'; 


export const store = configureStore({
    reducer: {
        draw: drawingReducer,
        word: wordReducer
    }
})