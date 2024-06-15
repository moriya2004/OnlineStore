import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAllProducts, deleteProduct, updateProduct } from './allProductSlice';
import {delProduct, addProduct} from '../order/orderSlice'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.allProduct.arrProduct);
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState([]);
  const user = useSelector(state => state.login.currentUser);
  const [added, setAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProductData, setEditedProductData] = useState(null);

  const handleUpdate = (productId) => {
    const selectedProduct = products.find(product => product.id === productId);
    setSelectedProduct(selectedProduct);
    setEditedProductData(selectedProduct ? { ...selectedProduct } : null); // Set initial values for editing if selectedProduct exists
    setOpenEditDialog(true);
  };

  const handleSaveChanges = () => {
    if (editedProductData) {
      console.log('Saving changes:', editedProductData); // Log data to be saved
      dispatch(updateProduct({ id: selectedProduct.id, productData: editedProductData }));
      setOpenEditDialog(false); // Close the edit dialog
    }
  };

  const handleInputChange = (field, value) => {
    if (!editedProductData) return; // Return if editedProductData is null
    setEditedProductData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  useEffect(() => {
    dispatch(saveAllProducts());
  }, [dispatch]);

  const addToCard = (e) => {
    if (user.username === 'admin') {
      setItems([...items, e.row]);
    } else {
      if (e.value) {
        dispatch(delProduct(e.row.id));
      } else {
        setAdded(true);
        dispatch(addProduct(e.row));
      }
    }
  };

  const yourCart = () => {
    setOpenCart(true);
  };

  const yourCartClose = () => {
    setOpenCart(false);
    setSelectedProduct(null); // Reset selectedProduct state
    setEditedProductData(null); // Reset editedProductData state
  };

  const deleteItems = () => {
    items.forEach(item => dispatch(deleteProduct(item.id)));
  };

  const baseColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'content', headerName: 'Content', width: 100 },
    { field: 'price', headerName: 'Price', type: 'number', width: 100 },
    { field: 'isCooling', headerName: 'Is Cooling', type: 'boolean', width: 200 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'prodDate', headerName: 'Prod date', width: 200 },
  ];

  const adminColumns = [
    ...baseColumns,
    {
      field: 'action',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <IconButton onClick={() => handleUpdate(params.row.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const columns = user.username === 'admin' ? adminColumns : baseColumns;

  return (
    <>
      <h1>All Products</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          onCellClick={addToCard}
        />
      </div>
      {user.username !== 'admin' && (
        <Button variant="outlined" onClick={yourCart}>
          <ProductionQuantityLimitsIcon /> Add to cart
        </Button>
      )}
      {user.username === 'admin' && (
        <Button variant="outlined" onClick={deleteItems}>
          <DeleteForeverIcon /> Delete items
        </Button>
      )}
      <BootstrapDialog
        onClose={yourCartClose}
        aria-labelledby="customized-dialog-title"
        open={openCart}
      >
        <IconButton
          aria-label="close"
          onClick={yourCartClose}
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
          {added ? (
            <p>The products have been successfully added to the cart!! 😃</p>
          ) : (
            <p>No items 🤔</p>
          )}
        </DialogContent>
      </BootstrapDialog>
      {user.username === 'admin' && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Name"
              value={editedProductData ? editedProductData.name : ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <TextField
              label="Description"
              value={editedProductData ? editedProductData.description : ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <TextField
              label="Content"
              value={editedProductData ? editedProductData.content : ''}
              onChange={(e) => handleInputChange('content', e.target.value)}
            />
            <TextField
              label="Price"
              type="number"
              value={editedProductData ? editedProductData.price : ''}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
            <TextField
              label="Company"
              value={editedProductData ? editedProductData.company : ''}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
            <TextField
              label="Prod date"
              value={editedProductData ? editedProductData.prodDate : ''}
              onChange={(e) => handleInputChange('prodDate', e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={editedProductData ? editedProductData.isCooling : false}
                onChange={(e) => handleInputChange('isCooling', e.target.checked)}
              />
              <Typography>Is Cooling</Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveChanges} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
