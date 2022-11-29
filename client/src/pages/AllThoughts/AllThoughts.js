import React, { useState, useEffect } from "react";
import axios from "axios";
import ThoughtItem from "../../components/ThoughItems/ThoughtItem";
import Paginatation from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import {
  getIndexOfFirstThought,
  getIndexOfLastThought,
  maxPagesCalculator,
} from "../../components/utils/PaginationCalculations";
import { URLRoutes } from "../../core/routes/routes";
import { useLocation } from "react-router-dom";
import Message from "../../components/Message/Message";

const AllThoughts = ({ searchTerm }) => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [thoughtsPerPage] = useState(9);
  const [currentThoughts, setCurrentThoughts] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      setMessageText(location.state.message)
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 3000)
      window.history.replaceState(null, '');
    }}, [location])

 

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
  }, [setThoughts, setLoading]);

  useEffect(() => {
    const indexOfLastThought = getIndexOfLastThought({
      currentPage,
      thoughtsPerPage,
    });
    const indexOfFirstThought = getIndexOfFirstThought({
      currentPage,
      thoughtsPerPage,
    });
    const currentThoughts = thoughts.slice(
      indexOfFirstThought,
      indexOfLastThought
    );

    setCurrentThoughts(currentThoughts);
  }, [currentPage, thoughts, thoughtsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          <Loader text="Fetching thoughts..." />
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
          maxPages={maxPagesCalculator({ thoughts, thoughtsPerPage })}
        />
      </div>
    </div>
  );
};

export default AllThoughts;
