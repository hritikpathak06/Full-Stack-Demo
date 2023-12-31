import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStar from "react-rating-stars-component"
import ReviewCard from '../Review Card/ReviewCard';
import Loader from '../Loader/Loader';
import {addItemsToCart} from "../../actions/cartAction"
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@material-ui/core"
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstant';


const ProductDetails = () => {

    const[quantity,setQuantity] = useState(1)

    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails)
    const{success, error:reviewError} = useSelector(state => state.newReview)

 

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        size: window.innerWidth < 600 ? 20 : 25,
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true
    }

    // FOR REVIEW SYSTEM
    const[open,setOpen] = useState(false)
    const[rating,setRating] = useState(0);
    const[comment,setComment] = useState("");


  

    const increaseQuantity = () => {
        if(product.stock <= quantity) return;
       const qty = quantity + 1;
       setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if(quantity <= 1) return;
       const qty = quantity-1;
       setQuantity(qty)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id,quantity))
        alert("Item Added To cart")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating",rating)
        myForm.set("comment", comment)
        myForm.set("productId", id)

        dispatch(newReview(myForm))

        setOpen(false);
    }

    useEffect(() => {
        dispatch(getProductDetails(id))

        if(reviewError){
            alert(reviewError)
            dispatch(clearErrors());
        }

        if(success){
            alert("Review Submitted SuccessFully");
            dispatch({type:NEW_REVIEW_RESET})
        }

    }, [dispatch, id,success, reviewError])

    return (
        <>
            {loading ? (<Loader />) : (

                <>
                    <div className="productDetails">

                        <div>
                            {/* <Carousel > */}
                            {product.images && product.images.map((item, i) => (
                                <img
                                    className='carouselImage'
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} slide`}
                                />
                            ))}
                            {/* // </Carousel>  */}

                        </div>
                        <div>

                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStar {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>Rs.{product.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" readOnly value={quantity} />
                                        <button onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>Status:{" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "Out of Stock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">
                        Reviews
                    </h3>

                    <Dialog
                    aria-labelledby='simple-dialog-title'
                    open={open}
                    onClose={submitReviewToggle}
                    >
                     <DialogTitle>Submit Review</DialogTitle>
                     <DialogContent className='submitDialog'>
                        <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size='large'
                        />
                        <textarea
                        className='submitDialogTextArea'
                        cols="30"
                        rows= "5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        >
                            </textarea>
                     </DialogContent>
                     <DialogActions>
                        <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                        <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
                     </DialogActions>
                    </Dialog>


                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    )
}

export default ProductDetails
