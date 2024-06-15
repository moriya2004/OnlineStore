import axios from 'axios';

export const getAllProductsfromServer = async () => {
  const res = await axios.get("http://localhost:4000/product");
  return res.data;
};

export const addProductfromServer = async (product) => {
  const res = await axios.post("http://localhost:4000/product", product);
  return res.data;
};

export const updateProductfromServer = async (id, product) => {
  const res = await axios.put(`http://localhost:4000/product/${id}`, product);
  return res.data;
};

export const addOrderfromServer=async(order)=>{
    const res=await axios.post("http://localhost:4000/order",order);
    return res.data;
}


