import React from "react";
import "./complaint.css";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className="mb-5">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link mr-2"
            onClick={goToPrevPage}
            href="#"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${
              currentPage == pgNumber ? "active" : ""
            } mr-2`}
          >
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={goToNextPage}
            href="#"
            disabled={currentPage === nPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
