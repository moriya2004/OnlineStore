
import axios from  'axios'
export const loginfromserver=async(user)=>{
    debugger
    const res=await axios.post("http://localhost:4000/user/login", user);
    return res.data;
}