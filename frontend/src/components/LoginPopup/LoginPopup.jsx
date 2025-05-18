import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../contexts/storeContext";
import axios from "axios";

const LoginPopup = ({ setLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { url, setToken } = useContext(StoreContext);

  const onChangeHandler = (evt) => {
    setData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const newUrl = `${url}/api/user/login`;
      const response = await axios.post(newUrl, data);
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-form">
        <div className="login-title">
          <h2>Login</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-inputs">
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPopup;
