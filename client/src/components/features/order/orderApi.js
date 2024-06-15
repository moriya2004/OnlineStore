import axios from 'axios'

// export const getAllProductsfromServer=async()=>{
//     const res=await axios.get("http://localhost:4000/product");
//     console.log(res)
//     return res.data;
// }
export const addOrderfromServer=async(order)=>{
    const res=await axios.post("http://localhost:4000/order",order);
    return res.data;
}
export const getOrderfromServer=async()=>{
    debugger
    const res=await axios.get("http://localhost:4000/order");
    return res.data;
}

// export const uptadeOrderfromServer=async(id,order)=>{
//     const res=await axios.put("http://localhost:4000/order/"+id,order);
//     return res.data;
// }
// export const deleteOrderfromServer=async(id)=>{
//     const res=await axios.delete("http://localhost:4000/order/"+id);
//     return res.data;
// }