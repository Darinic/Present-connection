import React from "react";

import AuthInput from "../Inputs/AuthInput/AuthInput";

const Register = ({ submitHandler, onChangeHandler, switchModeHandler }) => {
	return (
		<>
			<h2 className="heading__secondary">Register</h2>
			<form className="auth__form" onSubmit={submitHandler}>
				<AuthInput
					parameter={"username"}
					onChangeHandler={onChangeHandler}
					minLength={3}
					maxLength={30}
				/>
				<AuthInput
					parameter={"email"}
					onChangeHandler={onChangeHandler}
					minLength={6}
					maxLength={50}
				/>
				<AuthInput
					parameter={"password"}
					onChangeHandler={onChangeHandler}
					minLength={7}
					maxLength={30}
				/>
				<AuthInput
					parameter={"confirmPassword"}
					onChangeHandler={onChangeHandler}
					minLength={7}
					maxLength={30}
				/>
				<button className="auth__submit" type="submit">
                    Register
				</button>
			</form>
			<p className="auth__switchAuthModeText">
                Already have an account?
				<button
					onClick={switchModeHandler}
					className="auth__switchAuthModeButton"
				>
          Login
				</button>
			</p>
		</>
	);
};

export default Register;
