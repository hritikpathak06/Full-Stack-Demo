import React, { Fragment, useEffect } from 'react'
import "./Home.css";
import { CgMouse } from "react-icons/cg"
import MetaData from '../layout/MetaData';
import logo from "../../images/logo.avif";
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader/Loader';
import ProductCard from './ProductCard';



const Home = () => {
    const dispatch = useDispatch();

    const { loading, error, products, productsCount } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (

        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="Eccomerce" image={logo} />
                    <div className="banner">
                        <p>Welcome to Eccomerce</p>
                        <h1>Find Amazing Products Below</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {
                            products && products.map(product => (
                                <ProductCard product={product} />
                            ))
                        }
                    </div>
                </Fragment>
            )
            }
        </Fragment>
    )
}

export default Home
