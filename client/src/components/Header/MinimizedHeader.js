import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../Constants/routes";
import { AuthContext } from "../../Context/AuthContext";

const MinimizedHeader = () => {
	const auth = useContext(AuthContext);

	const closeMenu = () => {
		setTimeout(() => {
			document.querySelector(".navigation__checkbox").checked = false;
		}, 500);
	};

	return (
		<div className="navigation">
			<input type="checkbox" className="navigation__checkbox" id="navi-toggle" />

			<label htmlFor="navi-toggle" className="navigation__button">
				<span className="navigation__icon">&nbsp;</span>
			</label>

			<div className="navigation__background">
            &nbsp;
			</div>

			<div className="navigation__nav">
				<ul className="navigation__list">
					<li className="navigation__item"><Link to={appRoutes.HOMEPAGE} onClick={closeMenu} className="navigation__link">Homepage</Link></li>
					<li className="navigation__item"><Link to={appRoutes.ALLTHOUGHTS} onClick={closeMenu} className="navigation__link">All Thoughts</Link></li>
					<li className="navigation__item"><Link to={appRoutes.TOP9LIST} onClick={closeMenu} className="navigation__link">Top 9 List</Link></li>
					{auth.isLoggedIn && <li className="navigation__item"><Link to={appRoutes.NEWTHOUGHT} onClick={closeMenu} className="navigation__link">New Thought</Link></li>}
					{auth.isLoggedIn && <li onClick={auth.logout} className="navigation__item"><Link  to={appRoutes.ALLTHOUGHTS} onClick={closeMenu} className="navigation__link">Book now</Link></li>}
					{!auth.isLoggedIn && <li className="navigation__item"><Link to={appRoutes.AUTH} onClick={closeMenu} className="navigation__link">Login</Link></li>}
				</ul>
			</div>
		</div>
	);
};

export default MinimizedHeader;