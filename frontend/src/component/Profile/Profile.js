import React, { useEffect } from 'react'
import "./Profile.css"
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux'


const Profile = () => {
    const navigate = useNavigate()
    const {user,loading, isAuthenticated} = useSelector(state => state.user)

    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login")
        }
    },[navigate,isAuthenticated])

    return (
        <>
      {loading ? (<Loader/>) : (
          
        <>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <NavLink to="/me/update">Edit Profile</NavLink>
                </div>
<div>

                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{user.createdAt}</p>
                </div>
                <div>
                    <NavLink to="/orders">My Orders</NavLink>
                    <NavLink to="/password/update">Change Password</NavLink>
                </div>
            </div>
</div>
        </>
          )}
          </>
    )
}

export default Profile
