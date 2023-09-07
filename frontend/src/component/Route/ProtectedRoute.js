import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

const ProtectedRoute = ({element:element, ...rest}) => {
    const {loading,isAuthenticated, user} = useSelector(state => state.user)
  return (
    <>
       {loading && (
        <Route 
        {...rest}
        render={(props) => {
            if(isAuthenticated){
                return <Navigate replace to="/login"/>
            }
            return <element {...props}/>
        }}
        />
       )}
    </>
  )
}

export default ProtectedRoute
