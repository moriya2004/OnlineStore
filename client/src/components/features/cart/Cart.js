import { useSelector,useDispatch } from "react-redux";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './cart.css'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddOrder from "../addOrder/AddOrder";
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {addOrder,initCart} from '../order/orderSlice'
import { useNavigate } from 'react-router-dom';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'content', headerName: 'Content', width: 200 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 200,
  },
  {
    field: 'isCooling',
    headerName: 'Is Cooling',
    type: 'boolean',
    width: 200,
  },
  { field: 'company', headerName: 'Company', width: 200 },
  { field: 'prodDate', headerName: 'Prod date', width: 200, }
];
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Cart = () => {
  let cart = useSelector(s => s.order.cart)
  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const addingOrder = (order) => {
    debugger
    setOpen(false)
    if(cart.length>0)
      dispatch(addOrder(order))
    setOpenAlert(true)
    dispatch(initCart())
  }
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
    navigate('/user');
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center'}}>
        {openAlert&&<Alert onClose={handleClose2} severity="success" sx={{  width: 400 }}>
          ההזמנה הוזמנה בהצלחה!
        </Alert>}
    </div>
      <ul>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={cart}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </ul>
      {open && <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={handleOpen}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <AddOrder addOrder={addingOrder} />
        </DialogContent>
      </BootstrapDialog>}
      <Button variant="outlined" onClick={handleOpen}>
      <ShoppingCartIcon /> Complete Order
      </Button>
    </>


  );
}
export default Cart;