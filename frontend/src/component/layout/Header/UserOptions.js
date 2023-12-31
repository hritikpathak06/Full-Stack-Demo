import React, { useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from '@mui/material'
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { logout } from '../../../actions/userAction'
import { CgShoppingCart } from 'react-icons/cg'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"




const UserOptions = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {cartItems} = useSelector(state => state.cart)
    const[open,setOpen] = useState(false)

    const options = [
        {icon: <ListAltIcon style={{color:"tomato"}}/>, name:"Orders", func:orders},
        {icon: <PersonIcon style={{color:"black"}}/>, name:"Profile", func:account},
        {icon:<ShoppingCartIcon style={{color:"red"}}/>, name:`Cart(${cartItems.length})` , func:cart},
        {icon: <ExitToAppIcon style={{color:"yellowgreen"}}/>, name:"LogOut", func:logoutUser}
    ]

    if(user.role === "admin"){
        options.unshift({icon: <DashboardIcon/>, name:"Dashboard", func: dashboard})
    }

    function dashboard(){
       navigate("/admin/dashboard")
    }

    function orders(){
        navigate("/orders")
    }

    function account(){
        navigate("/account")
    }

    function cart(){
        navigate("/cart")
    }

    function logoutUser(){
     dispatch(logout())
     alert("logout successfully")
    }

    return (
        <>
     <SpeedDial
     ariaLabel='SpeedDial tooltip example'
     onClose={() => setOpen(false)}
     onOpen={() => setOpen(true)}
     open={open}
     direction='down'
     className='speedDial'
     icon={<img
     className='speedDialIcon'
     src={user.avatar.url ? user.avatar.url : "./profile.png"}
     alt='profile'
     />}
     >
       {options.map((item) => (
          <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} key={item.name} />
       ))}
     </SpeedDial>
        </>
    )
}

export default UserOptions
