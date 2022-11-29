import React from "react";

const Message = (props) => {
  return (
    <div className="message">
      <p className="message__text">{props.text}</p>
      <button className={`btn btn--red`} onClick={props.onClear}>
        OK
      </button>
    </div>
  );
};

export default Message;
