import { useState, useCallback } from "react";

export const useMessageContext = () => {
	const [message, setMessage] = useState("");
	const [showMessage, setShowMessage] = useState(false);
    
	const setMessageHandler = (message) => {
		setMessage(message);
		setShowMessage(true);
	};
    
	const onMessageClear = useCallback(() => {
		setMessage("");
		setShowMessage(false);
		console.log(showMessage);
	}, []);
    
	return { message, showMessage, setMessageHandler, onMessageClear };
};