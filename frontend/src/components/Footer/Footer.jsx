import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="contactUs">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias,
            quo. Voluptatem, veniam reiciendis. Ducimus hic rem perferendis
            mollitia expedita nobis velit pariatur similique vero fuga, eaque,
            perspiciatis, suscipit temporibus nesciunt.
          </p>
          <div className="footer-social">
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+92 3XX-XXXXXXX</li>
                <li>contact@ezitech.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Ezitech.com - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
