import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatDate from "../../components/utils/FormatDate";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { URLRoutes } from "../../constants/routes";

const ThoughtDetails = () => {
	const [thought, setThought] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`${URLRoutes.THOUGHTS_URL}/${id}`)
			.then((res) => {
				setThought(res.data.thought);
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}, [id]);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner asOverlay />
			) : (
				<div className="details">
					<div className="details__container">
						<h3 className="heading__secondary">Thought Details</h3>
						<label className="details__label"> Author </label>
						<input
							className="details__input"
							type="text"
							value={thought.author}
							disabled
						/>
						<label className="details__label"> Thought </label>
						<textarea
							className="details__textarea"
							type="text"
							value={thought.thought}
							disabled
						/>
						<div className="details__hashtagsBox">
							<div className="details__hashtag">
								<label className="details__label"> #1: </label>
								<input
									className="details__input details__input--hashtag"
									type="text"
									value={thought.hashtag1}
									disabled
								/>
							</div>
							<div className="details__hashtag">
								<label className="details__label"> #2: </label>
								<input
									className="details__input details__input--hashtag"
									type="text"
									value={thought.hashtag2}
									disabled
								/>
							</div>
						</div>
						<label className="details__label"> Created At </label>
						<input
							className="details__input details__input--time"
							type="text"
							value={FormatDate(thought.createdAt)}
							disabled
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default ThoughtDetails;
