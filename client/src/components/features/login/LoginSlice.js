import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {loginfromserver} from './LoginApi'

export const login = createAsyncThunk(
  'loginSlice/login',async (user) => {
    debugger
    
      const res = await loginfromserver(user)
      return res; // Assuming server returns some data upon successful login
     
  }
);
const clearSessionStorage = () => {
  sessionStorage.clear(); // Clears all items stored in session storage
};
export const logout = createAsyncThunk(
  'loginSlice/logout',
  async () => {
    clearSessionStorage(); // Clear session storage
    return null; // Assuming logout is successful
  }
);

const initialState = {
  currentUser:{},
  status: "",
}
const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.currentUser=action.payload
    }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          // Handle pending state if needed
          state.status="באמצע הבאת הנתונים"
          console.log(state.status)
        })
        .addCase(login.fulfilled, (state, action) => {
          debugger
          // Handle successful login
          // For example, update state with user data or token
          state.status="Handle successful login"
          state.currentUser=action.payload
        })
        .addCase(login.rejected, (state, action) => {
          // Handle login failure
          // For example, update state with error message
          state.status="login failure"
          console.log(state.status)
          console.log(action.payload) // This will contain the error message from the server
        });
    },
  });
export const { setUser } = loginSlice.actions
export default loginSlice.reducer;

