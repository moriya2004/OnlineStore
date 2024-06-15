import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import {getAllProductsfromServer,addProductfromServer,updateProductfromServer,addOrderfromServer} from './allProductApi'


const initialState={
    arrProduct:[]
 }
 export const addOrder = createAsyncThunk(
    'allProductSlice/addOrder', async (thunkAPI, order) => {
        const res = await addOrderfromServer(order);
        return res;
    }
)
 export const saveAllProducts=createAsyncThunk(
    'allProductSlice/saveAllProducts',async(thunkAPI)=>{
        const res=await getAllProductsfromServer();
        return res;
    }
)
export const addProduct=createAsyncThunk(
    'allProductSlice/addProduct',async(product,thunkAPI)=>{
        const res=await addProductfromServer(product);
        return res;
    }
)
export const updateProduct = createAsyncThunk(
  'allProductSlice/updateProduct',
  async ({ id, productData }, thunkAPI) => {
    try {
      const res = await updateProductfromServer(id, productData);
      return { id, product: res }; // Return updated product data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle API error
    }
  }
);
export const allProductSlice=createSlice({
    name:'allProduct',
    initialState,
    reducers:{
        deleteProduct: (state, action) => {
            state.arrProduct = state.arrProduct.filter(product => product.id !== action.payload);
          },
    },
    extraReducers:(builder)=>{
       builder.addCase(saveAllProducts.fulfilled,(state,action)=>{
           state.arrProduct=action.payload
           console.log(state.arrProduct)
       }).addCase(addProduct.fulfilled,(state,action)=>{
           state.arrProduct.push(action.payload)
       }).addCase(updateProduct.fulfilled, (state, action) => {
        const { id, product } = action.payload;
        state.arrProduct = state.arrProduct.map(p =>
          p.id === id ? { ...p, ...product } : p
        );
      });
   }
})
export const {deleteProduct}=allProductSlice.actions
export default allProductSlice.reducer