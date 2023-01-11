import React from "react";
import { Link } from "react-router-dom";

const Thought = (props) => {
	return (
		<Link to={`/thoughtdetails/${props.id}`} className="item__link">
			<div className="item">
				<p className="item__content">{props.thought}</p>
				<div className="item__hashtags">
					<div>
						<span className="item__hashtagSymbol">#</span>
						{props.hashtag1}
					</div>
					<div>
						<span className="item__hashtagSymbol">#</span>
						{props.hashtag2}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Thought;
