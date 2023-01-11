/* eslint-disable react/no-unescaped-entities */
import React from "react";

import AuthInput from "../Inputs/AuthInput/AuthInput";

const Login = ({ submitHandler, onChangeHandler, switchModeHandler }) => {
	return (
		<>
			<h2 className="heading__secondary">Login</h2>
			<form className="auth__form" onSubmit={submitHandler}>
				<AuthInput
					parameter={"email"}
					onChangeHandler={onChangeHandler}
					minLength={6}
					maxLength={35}
				/>
				<AuthInput 
					parameter={"password"}
					onChangeHandler={onChangeHandler}
					minLength={7}
					maxLength={30}
				/>
				<button className="auth__submit" type="submit">
          Login
				</button>
			</form>
			<p className="auth__switchAuthModeText">
        Don't have an account?
				<button
					onClick={switchModeHandler}
					className="auth__switchAuthModeButton"
				>
          Signup
				</button>
			</p>
		</>
	);
};

export default Login;
