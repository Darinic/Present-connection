import React, {useContext} from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../Context/MessageContext";

import thinkingBubble from "../../Assets/Img/thinkingBubble.png";
import hashtag from "../../Assets/Img/hashtag.png";
import { APIRoutes, appRoutes } from "../../Constants/routes";

const NewThought = () => {
	const {setMessage} = useContext(MessageContext);
	const [newThought, setNewThought] = useState({});


	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setNewThought({
			...newThought,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.post(APIRoutes.NEWTHOUGHT, newThought);
			if (result.data) 
			{
				navigate(appRoutes.ALLTHOUGHTS);
				setMessage("Your thought has been added succesfully added.");
			}
		} catch (err) 
		{
			setMessage(err.response.data.message);
		}
	};

	return (
		<div className="form">
			<form className="form__container" onSubmit={handleSubmit}>
				<h2 className="heading__secondary">Share Your Thought with us</h2>
				<div className="form__inputBox">
					<label className="form__label">
            Your Thought
						<img src={thinkingBubble} alt="user logo" className="form__icon" />
					</label>
					<textarea
						className="form__input"
						type="text"
						placeholder="Your Thought (from 20 to 200 characters)"
						rows="4"
						minLength={20}
						maxLength={200}
						required
						name="thought"
						value={newThought.thought}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form__inputBox">
					<label className="form__label">
            Enter 2
						<img src={hashtag} alt="user logo" className="form__icon" />
            hashtags
					</label>
					<div className="form__inputBox--hashtags">
						<input
							className="form__input"
							type="text"
							placeholder="#hashtag1"
							minLength={2}
							maxLength={10}
							required
							name="hashtag1"
							value={newThought.hashtag1}
							onChange={handleInputChange}
						/>
						<input
							className="form__input"
							type="text"
							placeholder="#hashtag2"
							minLength={2}
							maxLength={10}
							required
							name="hashtag2"
							value={newThought.hashtag2}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<button className="btn btn--white" type="submit">
          Submit
				</button>
			</form>
		</div>
	);
};

export default NewThought;
