import React from 'react'
import "./Footer.css"
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/appstore.png";

const Footer = () => {
    return (
        <>
          <footer id="footer">
            <div className="leftFooter">
             <h4>Download Our App</h4>
             <p>Download app for the android</p>
             <img src={playstore} alt="playstore" />
             <img src={appstore} alt="appstore" />
            </div>
            <div className="midFooter">
              <h1>Eccomerce</h1>
              <p>High Quality is our first priority</p>
              <p>Copyright 2023&copy; RitikPathak</p>
            </div>
            <div className="rightFooter">
               <h4>Follow Us</h4>
               <a href="#">Instagram</a>
               <a href="#">Facebook</a>
               <a href="#">LinkedIn</a>
            </div>
          </footer>
        </>
    )
}

export default Footer
