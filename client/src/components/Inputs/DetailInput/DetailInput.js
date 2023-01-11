import React from "react";

const DetailInput = ({labelText, inputValue}) => {
	return (
		<>
			<label className="details__label"> {labelText} </label>
			<input
				className="details__input"
				type="text"
				value={inputValue}
				disabled
			/>
		</>
	);
};

export default DetailInput;