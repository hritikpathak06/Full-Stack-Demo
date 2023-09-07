import React from 'react'
import "./Cart.css";
import CartItemsCard from './CartItemsCard';
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCard } from '../../actions/cartAction';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"

const Cart = () => {
    // const{id} = useParams();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    // const item = {
    //     product:"productID",
    //     price:200,
    //     name:"Ritik",
    //     image:"https://5.imimg.com/data5/VJ/MP/AK/SELLER-14071010/unicolr-formal-blue-shirt.jpeg",
    //     quantity:1
    // }

    const increaseQuantity = (id, quantity, stock) => {
        // const newQty = quantity + 1;
        // if (stock <= quantity) {
        //     return;
        // }
        // dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        // const newQty = quantity - 1;
        // if (1 >= quantity) {
        //     return;
        // }
        // dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
    dispatch(removeItemsFromCard(id))
    }


    const checkOutHandler = () => {
        navigate("/login?redirect=shipping")
    }

    return (
    
        <>
        {cartItems.length === 0 ? (
           <div className="emptyCard">
            <RemoveShoppingCartIcon/>
            <Typography>NO Product in Cart</Typography>
            <NavLink to="/products">View Products</NavLink>
           </div>
            ) :
            (
            <>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                    <CartItemsCard item={item} deleteCartItems ={deleteCartItems} />
                    <div className="cartInput">
                        <button onClick={decreaseQuantity(item.product, item.quantity)}>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                        )}>+</button>
                    </div>
                    <p className="cartSubTotal">
                        {`Rs${item.price * item.quantity}`}
                    </p>
                </div>
            ))}

            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`Rs ${cartItems.reduce(
                        (acc,item) => acc + item.quantity * item.price,
                        0
                    )}`}</p>

                </div>
                <div></div>
                <div className="checkoutBtn">
                    <button onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>
        </div>
    </>
        )
        }
        </>

        
    )
}

export default Cart
