import React, { useState } from "react";
import axios from "axios";
import "./auth.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Message from "../../components/Message/Message";

import { useNavigate } from "react-router-dom";
import { URLRoutes, appRoutes } from "../../constants/routes";
import { useAuth } from "../../hooks/auth-hook";
import { useMessageContext } from "../../hooks/message-hook";

const Auth = () => {
	const { login } = useAuth();
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [authForm, setAuthForm] = useState({});
	const { showMessage, message, setMessageHandler } = useMessageContext();

	const navigate = useNavigate();

	const switchModeHandler = () => {
		setAuthForm({}); //DOESNT WORK
		setIsLoginMode((prevMode) => !prevMode);
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setAuthForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const submitHandler = async (event) => {
		event.preventDefault();
        
		if(isLoginMode) {
			try {
				setIsLoading(true);
				const response = await axios.post(URLRoutes.LOGIN_URL, authForm);
				setIsLoading(false);
				login(response.data.userId);

			} catch (error) {
				setIsLoading(false);
				setMessageHandler(error.response.data.message);
			}
		} else {
			try {
				setIsLoading(true);
				const response = await axios.post(URLRoutes.SIGNUP_URL, authForm);
				setIsLoading(false);
				login(response.data.userId);
				navigate(appRoutes.ALLTHOUGHTS);
			} catch (error) {
				setIsLoading(false);
				setMessageHandler(error.response.data.message);
			}
		}
	};

	return (
		<div className="auth">
			{showMessage && <Message text={message} />}
			<div className="auth__container">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2 className="heading__secondary">{isLoginMode ? "Login" : "Register"}</h2>
				<form className="auth__form" onSubmit={submitHandler}>
					{!isLoginMode && (
						<input
							className="auth__input"
							name="name"
							id="name"
							type="text"
							minLength={3}
							maxLength={30}
							required
							placeholder="Name"
							onChange={onChangeHandler}
						/>
					)}
					<input
						className="auth__input"
						name="email"
						id="email"
						type="email"
						minLength={6}
						maxLength={35}
						required
						placeholder="Username Email"
						onChange={onChangeHandler}
					/>
					<input
						className="auth__input"
						name="password"
						id="password"
						type="password"
						minLength={7}
						maxLength={30}
						required
						placeholder="Password"
						onChange={onChangeHandler}
					/>
					{!isLoginMode && (
						<input
							className="auth__input"
							name="confirmPassword"
							id="confirmPassword"
							type="password"
							minLength={7}
							maxLength={30}
							required
							placeholder="Confirm Password"
							onChange={onChangeHandler}
						/>
					)}
					<button className="auth__submit" type="submit">
						{isLoginMode ? "Login" : "Register"}
					</button>
				</form>
				<p className="auth__switchAuthModeText">
					{isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						onClick={switchModeHandler}
						className="auth__switchAuthModeButton"
					>
						{isLoginMode ? "Signup" : "Login"}
					</button>
				</p>
			</div>
		</div>
	);
};

export default Auth;
