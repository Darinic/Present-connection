import React from "react";

const Pagination = ({ currentPage, paginate, maxPages }) => {
  const minPaginationPages = 5;

  const CreatePaginationPages = () => {
    for (let i = 2; i <= maxPages && i <= minPaginationPages; i++) {
      return (
        <div className="pagination__item" onClick={() => paginate(i)}>
          {i}
        </div>
      );
    }
  };

  const CustomPaginationElement = (page, element = 1) => {
    return (
      <div className="pagination__item" onClick={() => paginate(page)}>
        {element}
      </div>
    );
  };

  return (
    <div className="pagination__container">
      {currentPage !== 1 ? CustomPaginationElement(currentPage - 1, "<") : null}
      {CustomPaginationElement(1)}
      {CreatePaginationPages()}
      {maxPages !== currentPage
        ? CustomPaginationElement(currentPage + 1, ">")
        : null}
    </div>
  );
};

export default Pagination;
