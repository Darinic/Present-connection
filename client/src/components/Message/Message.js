import React, {useEffect} from "react";

import { useMessageContext } from "../../hooks/message-hook";

const Message = ({text}) => { 
	const { onMessageClear, showMessage } = useMessageContext();

	useEffect(() => {
		if(!showMessage) return;
		
		const timer = setTimeout(() => {
			onMessageClear();
		}, 3000);
		return () => clearTimeout(timer);
	}, [onMessageClear, showMessage]);

	return (	 
		<div className="message">
			<p className="message__text">{text}</p>
			<button className={"btn btn--red"} onClick={onMessageClear}>
        OK
			</button>
		</div>
	);
};

export default Message;
