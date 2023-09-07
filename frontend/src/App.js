import './App.css';
import Home from './component/Home/Home';
import Loader from './component/Loader/Loader';
import ProductDetails from './component/Product Details/ProductDetails';
import Products from './component/Product/Products';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import { useEffect, useState } from 'react';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './component/Profile/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSucess from './component/Cart/OrderSucess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Dashboard/Dashboard';
import ProductList from './component/Dashboard/ProductList';
import NewProduct from './component/Dashboard/NewProduct';


function App() {
  // const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, [])



  return (
    <>

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/account' element={<Profile />} />
        {isAuthenticated &&
          <Route path='/me/update' element={<UpdateProfile />} />
        }
        <Route path='/cart' element={<Cart />} />
        {isAuthenticated &&
          <Route path='/login/shipping' element={<Shipping />} />
        }
        {isAuthenticated &&
          <Route path='/order/confirm' element={<ConfirmOrder />} />
        }



        <Route
          path="/process/payment"
          element={(
            <Elements stripe={loadStripe("pk_test_51NjD9BSAwjgzRHfsve8nj5JK5m10kUTkNUElkVCZeF5t24Umby4GwgIO7VGdStTUq7FfNq6Ig57QdnyhXtfykhcN00ivsMtFwY")}>
              <Payment />
            </Elements>
          )}
        />

        {isAuthenticated &&
          <Route path='/success' element={<OrderSucess />} />
        }

        {isAuthenticated &&
          <Route path='/orders' element={<MyOrders />} />
        }

        {isAuthenticated &&
          <Route path='/order/:id' element={<OrderDetails />} />
        }
        {isAuthenticated &&
          <Route path='/admin/dashboard' element={<Dashboard />} />
        }

        {isAuthenticated &&
          <Route path='/admin/products' element={<ProductList />} />
        }

        {isAuthenticated &&
          <Route path='/admin/product' element={<NewProduct />} />
        }
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;
