import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLRoutes } from "../../constants/routes";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ThoughtItem from "../../components/ThoughItems/ThoughtItem";
import Message from "../../components/Message/Message";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";

import { useMessageContext } from "../../hooks/message-hook";

const AllThoughts = () => {
	const [thoughts, setThoughts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredThoughts, setFilteredThoughts] = useState([]);

	const { message, showMessage } = useMessageContext();

	const thoughtsPerPage = 9;

	let offset = currentPage * thoughtsPerPage;

	const currentPageThoughtsHandler = () => {
		if (filteredThoughts) {
			return filteredThoughts.slice(
				offset,
				offset + thoughtsPerPage
			);
		} else {
			return thoughts.slice(offset, offset + thoughtsPerPage);
		}
	};

	const maxPagesHandler = () => {
		if(filteredThoughts) {
			return Math.ceil(filteredThoughts.length / thoughtsPerPage);
		} else {
			return Math.ceil(thoughts.length / thoughtsPerPage);
		}
	};

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
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
	}, []);

	useEffect(() => {
		if (searchTerm.length > 1) {
			const results = thoughts.filter(
				(thought) =>
					thought.thought.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thought.hashtag1.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thought.hashtag2.toLowerCase().includes(searchTerm.toLowerCase())
			);
			offset = 0;
			setCurrentPage(0);
			setFilteredThoughts(results);
		} else {
			setFilteredThoughts(thoughts);
		}
	}, [searchTerm, setSearchTerm, thoughts]);

	return (
		<div className="thoughts">
			{showMessage && <Message text={message} />}
			{thoughts.length === 0 && (
				<div className="thoughts__empty">
          No Thoughts recorded, be the first one!
				</div>
			)}
			<div className="thoughts__searchBar">
				<SearchBar handleSearch={handleSearch} />
			</div>
			<div className="thoughts__container">
				{loading ? (
					<LoadingSpinner asOverlay />
				) : (
					currentPageThoughtsHandler().map((thought) => {
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
			<div className="thoughts__pagination">
				<Pagination handlePageClick={handlePageClick} maxPages={maxPagesHandler()} />
			</div>
		</div>
	);
};

export default AllThoughts;
