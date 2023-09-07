import React from 'react'
import "./sidebar.css";
import logo from "../../images/logo.avif";
import { NavLink } from 'react-router-dom';
import {TreeItem,TreeView} from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
   <>
   <div className="sidebar">
    <NavLink to="/">
        <img src={logo} alt="logo" />
    </NavLink>

    <NavLink to="/admin/dashboard">
        <p>
            <DashboardIcon/> Dashboard
        </p>
    </NavLink>

    <NavLink>
        <TreeView
        defaultCollapseIcon={<ExpandMoreIcon/>}
        defaultExpandIcon={<ImportExportIcon/>}
      >
       <TreeItem nodeId='1' label="Products">
           <NavLink to='/admin/products'>
            <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>}/>
           </NavLink>
           <NavLink to='/admin/product'>
            <TreeItem nodeId='3' label="Create" icon={<AddIcon/>}/>
           </NavLink>
           <NavLink to='/admin/orders'>
            <p>
                <ListAltIcon/>
                Orders
            </p>
            </NavLink>
            <NavLink to='/admin/users'>
            <p>
                <PeopleIcon/>
                Users
            </p>
           </NavLink>
           <NavLink to='/admin/reviews'>
            <p>
                <RateReviewIcon/>
                Reviews
            </p>
           </NavLink>
       </TreeItem>
        </TreeView>
    </NavLink>
   </div>
   </>
  )
}

export default Sidebar
