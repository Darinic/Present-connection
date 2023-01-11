import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import formatDate from "../../Utils/formatDate";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { APIRoutes } from "../../Constants/routes";
import { MessageContext } from "../../Context/MessageContext";
import DetailInput from "../../Components/Inputs/DetailInput/DetailInput";

const ThoughtDetails = () => {
	const [thought, setThought] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	const { setMessage } = useContext(MessageContext);

	useEffect(() => {
		const fetchThought = async () => {
			try {
				const result = await axios.get(`${APIRoutes.THOUGHTS}/${id}`);
				setThought(result.data.thought);
			} catch (error) {
				setMessage(error.response.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchThought();
	}, [id]);

	if(isLoading) {
		return (
			<LoadingSpinner />
		);
	}

	return (
		<div className="details">
			<div className="details__container">
				<h3 className="heading__secondary">Thought Details</h3>
				<DetailInput labelText={"Author"} inputValue={thought.author}/>
				<label className="details__label"> Thought </label>
				<textarea
					className="details__textarea"
					type="text"
					value={thought.thought}
					disabled
				/>
				<div className="details__hashtagsBox">
					<div className="details__hashtag">
						<DetailInput labelText={"#1"} inputValue={thought.hashtag1}/>
					</div>
					<div className="details__hashtag">
						<DetailInput labelText={"#2"} inputValue={thought.hashtag2}/>
					</div>
				</div>
				<DetailInput labelText={"Created At"} inputValue={formatDate(thought.createdAt)}/>
			</div>
		</div>
	);
};

export default ThoughtDetails;
