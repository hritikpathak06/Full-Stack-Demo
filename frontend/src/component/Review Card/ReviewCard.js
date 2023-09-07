import React from 'react'
import profile from "../../images/profile.png"
import ReactStar from "react-rating-stars-component"
import "../Product Details/ProductDetails.css"

const ReviewCard = ({review}) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "tomato",
    value: review.rating,
    isHalf: true
}
  return (
  <>
  <div className="reviewCard">
    <img src={profile} alt="user" />
    <p>{review.name}</p>
    <ReactStar {...options}/>
    <span>{review.comment}</span>
  </div>
  </>
  )
}

export default ReviewCard
