import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AddOrder({addOrder}) {
  const cartarr = useSelector(s => s.order.cart);
  const user = useSelector(s => s.login.currentUser);
  const [futureDate, setFutureDate] = useState(() => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    return nextWeek;
  });

  const [orders, setOrder] = React.useState({
    cart: [],
    dueDate: Date.now().toString(),
    userId:user.id,
    orderDate: futureDate.toString()
  });

  useEffect(() => {
    setOrder(prevOrder => ({
      ...prevOrder,
      dueDate: futureDate.toString(),
      orderDate: Date.now().toString(),
      cart: cartarr
    }));
    console.log(orders);
  }, [cartarr, futureDate]);

  
  const handleSubmitKeep = () => {
    //setOpen(true);
    addOrder(orders)
    //history.push('/products'); // ניווט חזרה לדף "כל המוצרים" בלחיצה על "keep buying"
  };
  
  const handleSubmitExit = () => {
    //setOpen(true);
    addOrder(orders)
    //history.push('/products'); // ניווט חזרה לדף "כל המוצרים" בלחיצה על "exit"
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <h1  variant="h1" style={{ color:"orangered", fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {user.name}
        </h1>
          <TextField
            label="City"
            variant="standard"
            color="warning"
            focused
            name="city"
          /><br />
          <TextField
            label="street"
            variant="standard"
            color="warning"
            focused
            name="street"
          /><br />
          <TextField
            label="House number"
            type="number"
            variant="standard"
            color="warning"
            focused
            name="house number"
          /><br />
          <p>Order Date: {new Date(orders.orderDate).toLocaleDateString()}</p>
          <p>Arrival date: {new Date(orders.dueDate).toLocaleDateString()}</p>
        </div>
        <Button onClick={handleSubmitKeep}>
          keep buying
        </Button>
        <Button onClick={handleSubmitExit}>
          exit
        </Button>
      </Box>
    </>
  );
}
