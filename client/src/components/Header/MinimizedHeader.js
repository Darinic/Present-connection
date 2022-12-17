import React, {useContext} from "react";
import { appRoutes } from "../../constants/routes";
import { AuthContext } from "../../context/auth-context";

const MinimizedHeader = () => {
	const auth = useContext(AuthContext);

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
					<li className="navigation__item"><a href={appRoutes.HOMEPAGE} className="navigation__link">Homepage</a></li>
					<li className="navigation__item"><a href={appRoutes.ALLTHOUGHTS} className="navigation__link">All Thoughts</a></li>
					<li className="navigation__item"><a href={appRoutes.TOP9LIST} className="navigation__link">Top 9 List</a></li>
					{auth.isLoggedIn && <li className="navigation__item"><a href={appRoutes.NEWTHOUGHT} className="navigation__link">New Thought</a></li>}
					{auth.isLoggedIn && <li onClick={auth.logout} className="navigation__item"><a href={appRoutes.ALLTHOUGHTS} className="navigation__link">Book now</a></li>}
					{!auth.isLoggedIn && <li className="navigation__item"><a href={appRoutes.AUTH} className="navigation__link">Login</a></li>}
				</ul>
			</div>
		</div>
	);
};

export default MinimizedHeader;