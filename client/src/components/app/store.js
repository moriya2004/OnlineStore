import { configureStore } from '@reduxjs/toolkit';
import allProductReducer from '../features/allProducts/allProductSlice';
import orderReducer from '../features/order/orderSlice';
import loginReducer from '../features/login/LoginSlice';

export const store = configureStore({
    reducer: {
        allProduct: allProductReducer,
        order: orderReducer,
        login: loginReducer,
        
    },
  })