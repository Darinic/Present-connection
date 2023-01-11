import React, { useState, useContext } from "react";
import axios from "axios";
import "./auth.css";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

import { useNavigate } from "react-router-dom";
import { APIRoutes, appRoutes } from "../../Constants/routes";
import { useAuth } from "../../Hooks/AuthHook";
import { MessageContext } from "../../Context/MessageContext";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";

const Auth = () => {
	const { login } = useAuth();
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [authForm, setAuthForm] = useState({});

	const {setMessage} = useContext(MessageContext);

	const navigate = useNavigate();

	const switchModeHandler = () => {
		setAuthForm({});
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
				const response = await axios.post(APIRoutes.LOGIN, authForm);
				setIsLoading(false);
				login(response.data.userId);
			} catch (error) {
				setMessage(error.response.data.message);
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				const response = await axios.post(APIRoutes.SIGNUP, authForm);
				setIsLoading(false);
				login(response.data.userId);
				navigate(appRoutes.ALLTHOUGHTS);
			} catch (error) {
				setMessage(error.response.data.message);
				setIsLoading(false);
			}
		}
	};

	if (isLoading) {
		return <LoadingSpinner asOverlay/>;
	}

	return (
		<div className="auth">
			<div className="auth__container">

				{isLoginMode ? (
					<Login switchModeHandler={switchModeHandler} submitHandler={submitHandler} onChangeHandler={onChangeHandler}   />
				) : (
					<Register switchModeHandler={switchModeHandler} submitHandler={submitHandler} onChangeHandler={onChangeHandler} />
				)}
			</div>
		</div>
	);
};

export default Auth;
