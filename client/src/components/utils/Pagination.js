import React from "react";

const Pagination = ({ currentPage, paginate, maxPages }) => {
  return (
    <div className="pagination__container">
      {currentPage !== 1 ? (
        <div
          className="pagination__item"
          onClick={() => paginate(currentPage - 1)}
        >
          &#60;
        </div>
      ) : null}
      <div className="pagination__item" onClick={() => paginate(1)}>
        1
      </div>
      {2 <= maxPages ? (
        <div className="pagination__item" onClick={() => paginate(2)}>
          2
        </div>
      ) : null}
      {3 <= maxPages ? (
        <div className="pagination__item" onClick={() => paginate(3)}>
          3
        </div>
      ) : null}
      {4 <= maxPages ? (
        <div className="pagination__item" onClick={() => paginate(4)}>
          4
        </div>
      ) : null}
      {5 <= maxPages ? (
        <div className="pagination__item" onClick={() => paginate(5)}>
          5
        </div>
      ) : null}
      {maxPages !== currentPage ? (
        <div
          className="pagination__item"
          onClick={() => paginate(currentPage + 1)}
        >
          &#62;
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
