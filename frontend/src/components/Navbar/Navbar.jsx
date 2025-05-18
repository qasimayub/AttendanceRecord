import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/storeContext";

const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { setToken, token, scrollToTop, url, user } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <img src={assets.logo} alt="" className="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to={"/"}
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            <button className="home" onClick={scrollToTop}>home</button>
          </Link>
          <a
            href="#contactUs"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact-us
          </a>
        </ul>
        <div className="navbar-right">
          {!token ? (
            <button className="button" onClick={() => setLogin(true)}>log in</button>
          ) : (
            <div className="navbar-profile">
              <img className="pfp" src={user?`${url}/images/${user.profilePicture}`:assets.profile_icon} alt="profile
              " />
              <ul className="navbar-dropdown">
              
              <li>
                  <img src={assets.home_icon} alt="" />
                  <p>Profile</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
