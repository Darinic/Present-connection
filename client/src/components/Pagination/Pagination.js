import React from "react";

import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, maxPages }) => {


	console.log(maxPages);
	return (
		<div className="pagination__container">
			<ReactPaginate
				previousLabel={"←"}
				nextLabel={"→"}
				breakLabel="..."
				initialPage={0}
				pageCount={maxPages}
				pageRangeDisplayed={7}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				previousLinkClassName={"pagination__link"}
				nextLinkClassName={"pagination__link"}
				disabledClassName={"pagination__link--disabled"}
				activeClassName={"pagination__link--active"}
			/>
		</div>
	);
};

export default Pagination;