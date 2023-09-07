import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "../constants/userConstant";


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                isAuthenticated: false,
                loading: true
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
         
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                user:null,
                isAuthenticated:false
            }    
        
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }    

        default:
            return state;
    }
};

export const profileReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return{
                ...state,
                loading: true
            }

         case UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpadted: action.payload,
            } 
            
          case UPDATE_PROFILE_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }

          case UPDATE_PROFILE_RESET:
            return{
                ...state,
                isUpadted:false
            }  

        default:
            return state;
    }
}