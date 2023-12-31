import React, { useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from '../../actions/productAction';
import Loader from '../Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Slider } from '@material-ui/core';


const categories = [
    "laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "smartphone",
];

const Products = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const[ratings,setRatings] = useState(0);


    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products)
    const { keyword } = useParams();
    // console.log(product)
    // const keyword = id.keyword

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price,category,ratings))
    }, [dispatch, keyword, currentPage, price,category,ratings])

    // let count = filteredProductsCount;


    return (
        <>
            {loading ? (<Loader />)
                : (
                    <>
                        <h1 className='productsHeading'>Products</h1>
                        <div className="products">
                            {products && products.map((product) => (
                                <ProductCard product={product} />
                            ))}
                        </div>

                        {/* PRICE FILTER  */}
                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                                min={0}
                                max={25000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            {keyword && (

                                
                                <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                            value={ratings}
                            onChange={(e,newRating) => {
                                setRatings(newRating)
                            }}
                            aria-labelledby='continuos-slider'
                            min={0}
                            max={5}
                            valueLabelDisplay='auto'
                            />
                        </fieldset>
                            )}

                        </div>

                        {/* *********************************************** */}

                        {/* {resultPerPage > productsCount &&( */}


                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                        {/* )} */}

                    </>
                )
            }
        </>
    )
}

export default Products
