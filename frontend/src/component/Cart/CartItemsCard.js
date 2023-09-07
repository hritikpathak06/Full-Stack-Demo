import React from 'react'
// import {Navlink} from "react-router-dom"
import { NavLink } from "react-router-dom"
import "./CartItemsCard.css"

const CartItemsCard = ({item, deleteCartItems}) => {
  return (
    <>
    <div className="cartItemCard">
        <img src={item.image.url} alt="ss" />
    <div>
    <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
    <span>{`Price: Rs${item.price}`}</span>
    <p onClick={() => deleteCartItems(item.product)}>Remove</p>
    </div>
    </div>
    </>
  )
}

export default CartItemsCard
