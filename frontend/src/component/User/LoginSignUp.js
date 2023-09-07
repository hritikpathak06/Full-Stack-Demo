import React, { useEffect, useRef, useState } from 'react'
import "./loginSignUp.css"
import Loader from '../Loader/Loader'
import { NavLink, redirect, useLocation } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import { CgFacebook, CgLock, CgLockUnlock } from 'react-icons/cg';
import FaceIcon from "@material-ui/icons/Face"
import {useSelector, useDispatch} from "react-redux"
import { clearErrors, login, register } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const {error,loading, isAuthenticated} = useSelector(state => state.user)
    
   

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const[avatar,setAvatar] = useState('');
    const[avatarPreview, setAvatarPreview] = useState("/logo192.png")
    
    
    
    
    
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword))
    }
    
    const registerSubmit = (e) => {
        e.preventDefault()
        
        const myForm = new FormData();
        
        myForm.set("user", user)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        dispatch(register(myForm))
    }
    
    const[users,setUsers] = useState({
        user: "",
        email: "",
        password:"",
    });
    
    const {user,email, password} = users;

    const registerDataChange = (e) => {
          if(e.target.name === "avatar"){
               const reader = new FileReader();

               reader.onload= () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
               }
                 reader.readAsDataURL(e.target.files[0]);
          }else{
            setUsers({...users, [e.target.name]: e.target.value})
          }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    
    useEffect(() => {
      if(isAuthenticated){
        navigate(redirect)
      }
    },[dispatch,navigate, isAuthenticated, redirect])

    const switchTab = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }



    return (
        <>
        {loading ? (<Loader/>) : (

        <>
            <div className="loginSignUpContainer">
                <div className="loginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTab(e, "login")}> LOGIN</p>
                            <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form action="" className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder='email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                />
                        </div>
                        <div className="loginPassword">
                            <CgLockUnlock />
                            <input
                                type="password"
                                placeholder='password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                />
                        </div>
                        <NavLink to="#" >Didn't Have an account</NavLink>
                        <input type="submit" value="Login" className='loginBtn' />
                    </form>

                    <form action="" className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>

                        {/* <div className="signUpName">
                            <CgFacebook/>
                            <input
                                type="text"
                                placeholder='Your Name'
                                required
                                name='name'
                                value={user}
                                onChange={registerDataChange}
                                />
                        </div> */}

                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder='Your Email'
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChange}
                                />
                        </div>

                        <div className="signUpPassowrd">
                            <CgLock/>
                            <input
                                type="password"
                                placeholder='Your Password'
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChange}
                                />
                        </div>

                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange}
                                />
                        </div>

                        <input type="submit" value="Register" className='signUpBtn' />

                    </form>

                </div>
            </div>
        </>
                                )}
                                </>
    )
}

export default LoginSignUp
