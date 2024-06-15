import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import { login } from './LoginSlice';
import { useNavigate } from 'react-router-dom';
import {setUser} from './LoginSlice'

export default function Login() {
  const { register, handleSubmit, formState: { isValid, } } = useForm({ mode: "onChange" })
  const dispatch = useDispatch();
  const nav = useNavigate();

  const save = async (formData) => {
    console.log('formData', formData);
    debugger
    if (formData.username == 'admin' && formData.password == '1234') {
      dispatch(setUser(formData))
      console.log('manager');
      nav('/manager');
    }
    else {
      const res = await dispatch(login(formData));
      console.log('res', res);

      if (res.payload === undefined) {
        console.log("User not found, please register");
        nav('/sign-up')
      } else {
        console.log("Login successful!!!!!!");
        nav('/user')
      }
    }
  };



  return (
    <Sheet
      sx={{
        width: 300,
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <div>
        <Typography level="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body-sm">Sign in to continue.</Typography>
      </div>
      <form onSubmit={handleSubmit(save)}>
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="user name"
            {...register("username", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </FormControl>
        <Button type="submit" disabled={!isValid} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
      </form>
      <Typography
        endDecorator={<Link href="/sign-up">Sign up</Link>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        Don&apos;t have an account?
      </Typography>
    </Sheet>
  );
}
