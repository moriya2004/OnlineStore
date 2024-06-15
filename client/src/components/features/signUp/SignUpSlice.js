import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupfromserver } from './SignUpApi';

export const signup = createAsyncThunk(
  'signupSlice/signup',async (user, thunkAPI) => {
      const res = await signupfromserver(user);
      return res; 
    
  }
);
const initialState = {
  currentUser:{},
  status: "idle", // Initial status
    error: null // Initial error state

}
const signupSlice = createSlice({
  name: 'signupSlice',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading"; // Update status to loading
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded"; // Update status to succeeded
        state.currentUser = action.payload; // Update currentUser with the received data
        state.error = null; // Reset error state
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed"; // Update status to failed
        state.error = action.payload; // Update error state with the received error message
      });
  },
});

export default signupSlice.reducer;