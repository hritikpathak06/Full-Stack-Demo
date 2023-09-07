import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { myOrderReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';

const reducer = combineReducers({
   products:productsReducer,
   productDetails:productDetailsReducer,
   user:userReducer,
   cart:cartReducer,
   newOrder:newOrderReducer,
   myOrders:myOrderReducer,
   orderDetails:orderDetailsReducer,
   newReview:newReviewReducer,
   newProduct:newProductReducer,
   product:productReducer
   
});

let initialState = {
   cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},

   },
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;

