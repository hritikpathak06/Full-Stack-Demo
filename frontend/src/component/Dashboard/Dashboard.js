import React from 'react'
import "./Dashboard.css";
import Sidebar from './Sidebar';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js";


const Dashboard = () => {

   



    return (
        <>
            <div className="dashboard">
                <Sidebar />

                <div className="dashboardContainer">
                    <Typography component="h1">Dashboard</Typography>
                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br /> Rs.4000
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <NavLink to="/admin/products">
                                <p>Product</p>
                                <p>50</p>
                            </NavLink>
                            <NavLink to="/admin/orders">
                                <p>Orders</p>
                                <p>6</p>
                            </NavLink>
                            <NavLink to="/admin/users">
                                <p>Users</p>
                                <p>6</p>
                            </NavLink>

                        </div>
                    </div>

                    {/* For Graph */}
                    {/* <div className="lineChart">
                        <Chart data={data} />
                    </div> */}



                </div>
            </div>
        </>
    )
}

export default Dashboard
