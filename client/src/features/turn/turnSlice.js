import { createSlice } from "@reduxjs/toolkit";

const initialState = { turn: {payload: null}}; 

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    setTurn: (state,turn) => {
      state.turn = turn; 
    }
  },
});

export const { setTurn } = turnSlice.actions;

export default turnSlice.reducer; 