import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import Alert from '@mui/material/Alert';
import { signup } from './SignUpSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../login/LoginSlice';


export default function SignUp() {
  const { register, handleSubmit, getValues, formState: { errors, isValid, } } = useForm({ mode: "onChange" })
  const dispatch = useDispatch();
  const nav = useNavigate();

  const save = async (formData) => {
    console.log('formData', formData);
    debugger
    const { password2, ...signupData } = formData;

    const res = await dispatch(signup(signupData));
    console.log('res', res);

    if (res.payload === "error  in add users ") {
      console.log("error  in add users ");
    } else {
      console.log("sign up successful!!!!!!");
      const res = await dispatch(login(signupData));
      console.log('res', res);
      nav('/user')
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
        <Typography level="body-sm">Sign up to continue.</Typography>
      </div>
      <form onSubmit={handleSubmit(save)}>
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="user name"
            {...register("name", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>identity</FormLabel>
          <Input
            name="tz"
            type="text"
            placeholder="identity"
            {...register("tz", { required: true, pattern: /[0-9]{9}/ })}
          />
          {errors.tz && <Alert severity="warning" >תעודת זהות חייבת להכיל 9 ספרות </Alert >}
        </FormControl>
        <FormControl>
          <FormLabel>telephone</FormLabel>
          <Input
            name="telephone"
            type="text"
            placeholder="telephone"
            {...register("telephone", { required: true, minLength: 9 })}
          />
          {errors.telephone && <Alert severity="warning">הפלפון חייב להיות מינימום תשע ספרות</Alert >}
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
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            {...register("password2", { required: true, validate: (val) => getValues("password") == val })}

          />
          {errors.password2?.type == "validate" && <Alert severity="error">הסיסמא לא זהה</Alert >}
          {errors.password2?.type == "required" && <Alert severity="warning">זהו שדה חובה</Alert >}
        </FormControl>
        <Button type="submit" disabled={!isValid} sx={{ mt: 1 /* margin top */ }}>Sign up</Button>
      </form>
    </Sheet>
  );
}