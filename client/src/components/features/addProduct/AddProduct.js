import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AddProduct({ onAddProduct }) {
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    content: '',
    price: '',
    company: '',
    prodDate: '',
    isCooling: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          label="Name"
          variant="standard"
          color="warning"
          focused
          name="name"
          value={product.name}
          onChange={handleChange}
        /><br/>
        <TextField
          label="Description"
          variant="standard"
          color="warning"
          focused
          name="description"
          value={product.description}
          onChange={handleChange}
        /><br/>
        <TextField
          label="Content"
          variant="standard"
          color="warning"
          focused
          name="content"
          value={product.content}
          onChange={handleChange}
        /><br/>
        <TextField
          label="Price"
          type="number"
          variant="standard"
          color="warning"
          focused
          name="price"
          value={product.price}
          onChange={handleChange}
        /><br/>
        <TextField
          label="Company"
          variant="standard"
          color="warning"
          focused
          name="company"
          value={product.company}
          onChange={handleChange}
        /><br/>
        <TextField
          label="Production Date"
          type="date"
          variant="standard"
          color="warning"
          focused
          name="prodDate"
          value={product.prodDate}
          onChange={handleChange}
        />
      </div>
      <span>Is Cooling</span>
      <Checkbox
        {...label}
        sx={{
          color: orange[900],
          '&.Mui-checked': {
            color: orange[900],
          },
        }}
        name="isCooling"
        checked={product.isCooling}
        onChange={handleChange}
      /><br/>
      <Button type="submit">Save changes</Button>
    </Box>
  );
}
