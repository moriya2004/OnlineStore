import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import {addOrderfromServer,getOrderfromServer} from './orderApi'
const initialState={
    cart:[],
    orders:[]
 }

export const addOrder=createAsyncThunk(
    'orderSlice/addOrder',async(order,thunkAPI)=>{
        debugger
        const res=await addOrderfromServer(order);
        return res;
    }
)
export const getOrder=createAsyncThunk(
    'orderSlice/getOrder',async(thunkAPI)=>{
        debugger
        const res=await getOrderfromServer();
        console.log(res)
        return res;
    }
)
 export const orderSlice=createSlice({
     name:'orderSlice',
     initialState,
     reducers:{
        delProduct:(state,action)=>{
            debugger
            let index = state.cart.findIndex(x => x.id == action.payload)
            state.cart.splice(index, 1)
        },
        addProduct:(state,action)=>{
            state.cart.push(action.payload)
        },
        updateProduct:(state,action)=>{
            let index2=state.cart.findIndex(x=>x.id==action.payload.id)
            state.cart.splice(index2.toExponential,1)
            state.cart.push(action.payload.product)
        },
        initCart : (state,action)=>{
            state.cart=[]
        }
     },
     extraReducers:(builder)=>{
         builder.addCase(addOrder.fulfilled,(state,action)=>{
            state.orders.push(action.payload)
        }).addCase(getOrder.fulfilled,(state,action)=>{
            state.orders=action.payload
        })
    }
})
export const {delProduct,initCart,addProduct,updateProduct}=orderSlice.actions
export default orderSlice.reducer