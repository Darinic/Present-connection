function getIndexOfLastThought({ currentPage, thoughtsPerPage }) {
	const indexOfLastThought = currentPage * thoughtsPerPage;

	return indexOfLastThought;
}

function getIndexOfFirstThought({ currentPage, thoughtsPerPage }) {
	const indexOfLastThought = currentPage * thoughtsPerPage;
	const indexOfFirstThought = indexOfLastThought - thoughtsPerPage;

	return indexOfFirstThought;
}

function maxPagesCalculator({ thoughts, thoughtsPerPage }) {
	const maxPages =
    Math.ceil(thoughts.length / thoughtsPerPage) === 0
    	? 1
    	: Math.ceil(thoughts.length / thoughtsPerPage);

	return maxPages;
}

export { maxPagesCalculator, getIndexOfFirstThought, getIndexOfLastThought };
