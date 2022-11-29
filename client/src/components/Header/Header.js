import React from "react";
import logo from "../../assets/svg/shower.svg";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Header = (props) => {
  const location = useLocation();
  return (
    <div className="header">
      <div className="header__leftMenu">
        <Link to="/" className="header__navLink header__navLink--1">
          <img className="header__logo" src={logo} alt="logo"/>
          Homepage
        </Link>
      </div>
      <div className="header__rightMenu">
      {location.pathname === "/allthoughts" && (
          <SearchBar handleSearch={props.handleSearch} />
        )}
        <Link to="/allthoughts" className="header__navLink header__navLink--2">
          All Thoughts
        </Link>
        <Link to="/newthought" className="header__navLink header__navLink--3">
          Share Your Thought
        </Link>
      </div>
    </div>
  );
};

export default Header;
