import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Home.css";
import ReactStar from "react-rating-stars-component"


const ProductCard = ({product}) => {
  const options = {
    edit:false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 20:25,
    activeColor:"tomato",
    value:product.ratings,
    isHalf:true
  }
  
  return (
    <>
    <NavLink className="productCard" to={`/product/${product._id}`}>

        <img src={product.images[0].url} alt="" />

        <p>{product.name}</p>

        <div>
          <ReactStar {...options}/> <span className='span'>{`(${product.numOfReviews})`}</span>
        </div>
          <span>{`Rs. ${product.price}`}</span>
        

    </NavLink>
    </>
  )
}

export default ProductCard
