import React, { useState, useEffect } from "react";
import ThoughtItem from "./ThoughtItem";
import axios from "axios";
import Paginatation from "../utils/Pagination";

const AllThoughts = ({searchTerm}) => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [thoughtsPerPage] = useState(9);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/thoughts")
      .then((res) => {
        setThoughts(res.data.thoughts.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });      
  }, [setThoughts, setLoading]);

  const indexOfLastThought = currentPage * thoughtsPerPage;
  const indexOfFirstThought = indexOfLastThought - thoughtsPerPage;
  const currentThoughts = thoughts.slice(indexOfFirstThought, indexOfLastThought);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="thoughts">
      {thoughts.length === 0 && (
        <div className="thoughts__empty">
          No Thoughts recorded, be the first one!
        </div>
      )}
      <div className="thoughts__container">
        {loading ? (
          <div className="loader">Fetching data...</div>
        ) : (
          currentThoughts.map((thought) => {
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
      <div className="pagination">
        <Paginatation
          currentPage={currentPage}
          paginate={paginate}
          maxPages={
            Math.ceil(thoughts.length / thoughtsPerPage) === 0
              ? 1
              : Math.ceil(thoughts.length / thoughtsPerPage)
          }
        />
      </div>
    </div>
  );
};

export default AllThoughts;
