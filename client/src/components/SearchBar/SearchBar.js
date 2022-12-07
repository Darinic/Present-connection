import React from "react";

const SearchBar = (props) => {
	return (
		<div className="searchbar__container">
			<input
				className="searchbar__input"
				type="text"
				placeholder="# Search"
				onChange={props.handleSearch}
				maxLength="10"
			/>

		</div>
	);
};

export default SearchBar;