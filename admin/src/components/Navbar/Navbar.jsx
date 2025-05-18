import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../contexts/storeContext'

const Navbar = () => {
  const {token, url, setToken, setLogin, admin} = useContext(StoreContext)
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setLogin(true);
  };
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" /> 
        {token ? (
            <div className="navbar-profile">
              <img className='pfp' src={admin?`${url}/images/${admin.profilePicture}`:assets.profile_icon} alt="" />
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
          ): <></>}
    </div>
  )
}

export default Navbar