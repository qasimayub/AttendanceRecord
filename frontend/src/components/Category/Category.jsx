import React, { useContext, useState } from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../contexts/storeContext";

const Category = ({ name, image, to }) => {
  const { login, setLogin, token, scrollToTop } = useContext(StoreContext);
  return (
    <>
      {token ? (
        <Link to={to} onClick={()=> scrollToTop()} className="category">
          <h3>{name}</h3>
          <img className="category-img" src={image} alt="" />
        </Link>
      ) : (
        <div onClick={() => setLogin(true)} className="category">
          <h3>{name}</h3>
          <img className="category-img" src={image} alt="" />
        </div>
      )}
    </>
  );
};

export default Category;
