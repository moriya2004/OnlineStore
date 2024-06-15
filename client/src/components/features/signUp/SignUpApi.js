import axios from  'axios'
export const signupfromserver=async(user)=>{
    const res=await axios.post("http://localhost:4000/user ", user);
    return res.data;
}