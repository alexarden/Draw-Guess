import { createSlice } from "@reduxjs/toolkit";

const initialState = { drawingData: null};

export const drawingSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    setDrawing: (state,drawing) => {
      state.drawing = drawing;
    }
  },
});

export const { setDrawing } = drawingSlice.actions;

export default drawingSlice.reducer;
 