import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLRoutes } from "../../constants/routes";
import { useLocation } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ThoughtItem from "../../components/ThoughItems/ThoughtItem";
import Message from "../../components/Message/Message";
import Pagination from "../../components/Pagination/Pagination";
// import SearchBar from "../../components/SearchBar/SearchBar";

const AllThoughts = () => {
	const [thoughts, setThoughts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [messageText, setMessageText] = useState("");
	const [showMessage, setShowMessage] = useState(false);

	const thoughtsPerPage = 9;

	const offset = currentPage * thoughtsPerPage;

	const currentPageThoughts = thoughts.slice(offset, offset + thoughtsPerPage);

	const maxPages = Math.ceil(thoughts.length / thoughtsPerPage);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setMessageText(location.state.message);
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
			}, 3000);
			window.history.replaceState(null, "");
		}
	}, [location]);

	const handleClear = () => {
		setShowMessage(false);
	};

	useEffect(() => {
		axios
			.get(URLRoutes.THOUGHTS_URL)
			.then((res) => {
				setThoughts(res.data.thoughts.reverse());
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [setThoughts, setLoading, currentPageThoughts]);

	return (
		<div className="thoughts">
			{showMessage && <Message text={messageText} onClear={handleClear} />}
			{thoughts.length === 0 && (
				<div className="thoughts__empty">
          No Thoughts recorded, be the first one!
				</div>
			)}
			<div className="thoughts__container">
				{loading ? (
					<LoadingSpinner asOverlay />
				) : (
					currentPageThoughts.map((thought) => {
						return (
							<ThoughtItem
								key={thought._id}
								id={thought._id}
								thought={thought.thought}
								hashtag1={thought.hashtag1}
								hashtag2={thought.hashtag2}
							/>
						);
					})
				)}
			</div>
			<Pagination handlePageClick={handlePageClick} maxPages={maxPages} />
		</div>
	);
};

export default AllThoughts;
