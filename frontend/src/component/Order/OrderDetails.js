import React, { useEffect } from 'react'
import "./OrderDetails.css";
import {useDispatch,useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom"
import {Typography} from "@material-ui/core";
import {getOrderDetails, clearErrors} from "../../actions/orderAction";
import Loader from "../Loader/Loader";


const OrderDetails = () => {
    const{id} = useParams();
    const dispatch = useDispatch();
    const{order,error,loading} = useSelector((state) => state.orderDetails);
    const {user} = useSelector((state) => state.user)

    useEffect(() => {
        if(error){
            alert(error);
            dispatch(clearErrors);
        }
        dispatch(getOrderDetails(id));

    },[dispatch,error,id])

  return (
  <>
  {loading ? (<Loader/>) : (
    <>
    <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image.url} alt="Product" />
                      <NavLink to={`/product/${item.product}`}>
                        {item.name}
                      </NavLink>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
    </>
  )}
  </>
  )
}

export default OrderDetails
