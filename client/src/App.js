
import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/features/login/Login';
import SignUp from './components/features/signUp/SignUp';
import Manager from './components/features/navbar/manager';
import AllProducts from './components/features/allProducts/AllProduct';
import User from './components/features/navbar/user';
import AddOrder from './components/features/addOrder/AddOrder';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="" element={<Login />} />
            <Route path="/login" component={<Login/>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/user" element={<User />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/add-order" element={<AddOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
