import React, { useEffect } from 'react'
import LaunchIcon from "@material-ui/icons/Launch";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import {useDispatch,useSelector} from "react-redux";
import { myOrders, clearErrors } from '../../actions/orderAction';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const MyOrders = () => {

    const dispatch = useDispatch();

    const {loading, error,orders} = useSelector((state) => state.myOrders);
    const {user} = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
              return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor"
                : "redColor";
            },
          },
          {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
          },
      
          {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
          },
      
          {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <NavLink to={`/order/${params.getValue(params.id, "id")}`}>
                  <LaunchIcon />
                </NavLink>
              );
            },
          },
    ];
    const rows = [];

    orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    useEffect(() => {
        if(error){
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders())
    },[dispatch,error])




  return (
   <>
   {loading ? (<Loader/>): (
    <div className="myOrdersPage">
  <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  disableSelectionOnClick
  className='myOrdersTable'
  autoHeight
  />
  <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
    </div>
   )}
   </>
  )
}

export default MyOrders
