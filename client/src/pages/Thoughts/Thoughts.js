import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { APIRoutes } from "../../Constants/routes";

import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Thought from "../../Components/Thought/Thought";
import Pagination from "../../Components/Pagination/Pagination";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { MessageContext } from "../../Context/MessageContext";

const Thoughts = () => {
	const [thoughts, setThoughts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredThoughts, setFilteredThoughts] = useState([]);

	const thoughtsPerPage = 9;

	const { setMessage } = useContext(MessageContext);

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

	const calculateMaxPages = () => {
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
		const fetchThoughts = async () => {
			try {
				const result = await axios.get(APIRoutes.THOUGHTS);
				setThoughts(result.data.thoughts.reverse());
			} 
			catch (error) {
				setMessage(error.response.data.message);
			} finally {
				setLoading(false);
			}
		};
		fetchThoughts();
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
							<Thought
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
				<Pagination handlePageClick={handlePageClick} maxPages={calculateMaxPages()} />
			</div>
		</div>
	);
};

export default Thoughts;
