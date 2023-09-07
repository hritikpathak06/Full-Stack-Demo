import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css"
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const OrderSucess = () => {
  return (
    <>
    <div className="orderSuccess">
        <CheckCircleIcon/>
        <Typography>Hurray!Your Order Has Been Placed Successfully</Typography>
        <NavLink to="/orders">View Orders</NavLink>
    </div>
    </>
  )
}

export default OrderSucess
