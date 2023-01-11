import React from "react";

const AuthInput = ({parameter, onChangeHandler, minLength, maxLength}) => {

	let placeholder;

	switch(parameter) {
	case "username":
		placeholder = "Username";
		break;
	case "email":
		placeholder = "Username Email";
		break;
	case "password":
		placeholder = "Password";
		break;
	case "confirmPassword":
		placeholder = "Confirm Password";
		break;
	default:
		break;
	}

	return(
		<input
			className="auth__input"
			name={parameter}
			id={parameter}
			type={parameter == "confirmPassword" ? "password" : parameter}
			minLength={minLength}
			maxLength={maxLength}
			required
			placeholder={placeholder}
			onChange={onChangeHandler}
		/>
	);
};

export default AuthInput;