import React from "react";
import { useState } from "react";
import axios from "axios";
import Message from "../utils/Message";
import { useNavigate } from "react-router-dom";

import userPicture from "../../assets/img/user.png";
import thinkingBubble from "../../assets/img/thinkingBubble.png";
import hashtag from "../../assets/img/hashtag.png";

const NewThought = () => {
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [newForm, setNewForm] = useState({
    author: "",
    thought: "",
    hashtag1: "",
    hashtag2: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/thoughts/newThought", newForm)
      .then((res) => {
        if (res.data) {
          setMessageText(
            "Your thought has been added succesfully. You will be redirected shortly to all Posts!"
          );
          setNewForm({
            author: "",
            thought: "",
            hashtag1: "",
            hashtag2: "",
          });
          setShowMessage(true);
          setTimeout(() => {
            navigate("/allthoughts");
          }, 2000);
        }
      })
      .catch((err) => {
        setMessageText(err.response.data.message);
        setShowMessage(true);
      });
  };

  const handleClear = () => {
    setShowMessage(false);
  };

  return (
    <div className="form">
      {showMessage && <Message text={messageText} onClear={handleClear} />}
      <form className="form__container" onSubmit={handleSubmit}>
        <h2 className="heading__secondary">Share Your Thought with us</h2>
        <div className="form__inputBox">
          <label className="form__label">
            Introduce yourself
            <img src={userPicture} alt="user logo" className="form__icon" />
          </label>
          <input
            className="form__input"
            type="text"
            placeholder="Author (from 3 to 30 characters)"
            minLength={3}
            maxLength={30}
            required
            name="author"
            value={newForm.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label">
            Your Thought
            <img src={thinkingBubble} alt="user logo" className="form__icon" />
          </label>
          <textarea
            className="form__input"
            type="text"
            placeholder="Your Thought (from 20 to 200 characters)"
            rows="4"
            minLength={20}
            maxLength={200}
            required
            name="thought"
            value={newForm.thought}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label">
            Enter 2
            <img src={hashtag} alt="user logo" className="form__icon" />
            hashtags
          </label>
          <div className="form__inputBox--hashtags">
            <input
              className="form__input"
              type="text"
              placeholder="#hashtag1"
              minLength={2}
              maxLength={10}
              required
              name="hashtag1"
              value={newForm.hashtag1}
              onChange={handleInputChange}
            />
            <input
              className="form__input"
              type="text"
              placeholder="#hashtag2"
              minLength={2}
              maxLength={10}
              required
              name="hashtag2"
              value={newForm.hashtag2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className="btn btn--white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewThought;
