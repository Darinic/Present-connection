import React, { useContext } from "react";
import logo from "../../assets/svg/shower.svg";
import { Link } from "react-router-dom";
// import {useLocation} from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import { appRoutes } from "../../constants/routes";
// import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
	const auth = useContext(AuthContext);

	// const location = useLocation();

	const constantRoutes = (
		<>
			{/* {location.pathname === "/allthoughts" && (
				<SearchBar handleSearch={props.handleSearch} />
			)} */}
			<Link
				to={appRoutes.ALLTHOUGHTS}
				className="header__navLink header__navLink--2"
			>
          All Thoughts
			</Link>
			<Link
				to={appRoutes.TOP9THOUGHTS}
				className="header__navLink header__navLink--3"
			>
          Top 9 All Times
			</Link>
		</>
	);

	let Routes;



	if (auth.isLoggedIn) {
		Routes = (
			<>
				{constantRoutes}
				<Link
					to={appRoutes.NEWTHOUGHT}
					className="header__navLink header__navLink--4"
				>
          Share Your Thought
				</Link>
				<Link
					to={appRoutes.ALLTHOUGHTS}
					onClick={auth.logout}
					className="header__navLink header__navLink--5"
				>
          Logout
				</Link>
			</>
		);
	} else {
		Routes = (
			<>
				{constantRoutes}
				<Link
					to={appRoutes.AUTH}
					className="header__navLink header__navLink--5"
				>
          Login
				</Link>
			</>
		);
	}

	return (
		<div className="header">
			<div className="header__leftMenu">
				<Link
					to={appRoutes.HOMEPAGE}
					className="header__navLink header__navLink--1"
				>
					<img className="header__logo" src={logo} alt="logo" />
          Homepage
				</Link>
			</div>
			<div className="header__rightMenu">{Routes}</div>
		</div>
	);
};

export default Header;
