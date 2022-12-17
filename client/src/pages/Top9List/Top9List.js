import React from "react";

const Top9List = () => {
	return(
		<div className="top9List">
			<div className="top9List__container">
				<div className="top9List__ButtonContainer">
					<button className="top9List__choosingButton">All time most liked thoughts</button>
					<button className="top9List__choosingButton">Most liked thoughts in last 30 days</button>
					<button className="top9List__choosingButton">Most liked thoughts in last 7 days</button>
				</div>
				<div className="top9List__listContainer">
					Rendering list here top 9 chosen by user
				</div>
			</div>
		</div>
	);
};

export default Top9List;