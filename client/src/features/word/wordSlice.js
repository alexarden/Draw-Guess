import { createSlice } from "@reduxjs/toolkit";

const initialState = { word: ''};

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    setWord: (state,word) => {
      state.word = word; 
    }
  },
});

export const { setWord } = wordSlice.actions;

export default wordSlice.reducer; 