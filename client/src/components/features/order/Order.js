import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ViewListIcon from '@mui/icons-material/ViewList';
import "./order.css";

import { getOrder } from "./orderSlice";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "content", headerName: "Content", width: 200 },
  { field: "price", headerName: "Price", type: "number", width: 200 },
  {
    field: "isCooling",
    headerName: "Is Cooling",
    type: "boolean",
    width: 200
  },
  { field: "company", headerName: "Company", width: 200 },
  { field: "prodDate", headerName: "Prod date", width: 200 }
];

export default function Order() {
  const dispatch = useDispatch();
  const orderArr = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.login.currentUser);

  debugger
 
 
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  

  return (<>
    {user.username === "admin" && <h3>{user.username}</h3>}
    {user.username != "admin" && <h3>{user.name}</h3>}
    <h2><ViewListIcon></ViewListIcon> Your orders </h2>
    <Box>
      {orderArr.map((order, index) => (
        (user.username === "admin" || user.id == order.userId) && (
          <Card key={index} className="order-card">
            <CardContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Order Date: {order.orderDate}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Due Date: {order.dueDate}
              </Typography>
              <div className="data-grid-container">
                <DataGrid rows={order.cart} columns={columns} />
              </div>
            </CardContent>
          </Card>
        )
      ))}
    </Box>
  </>
  );
}