/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Header from "./Components/Header/Header";
import { appRoutes } from "./Constants/routes";
import { AuthContext } from "./Context/AuthContext";
import { useAuth } from "./Hooks/AuthHook";
import { MessageContext } from "./Context/MessageContext";

import Homepage from "./Pages/Homepage/Homepage";
import Thoughts from "./Pages/Thoughts/Thoughts";
import NewThought from "./Pages/NewThought/NewThought";
import ThoughtDetails from "./Pages/ThoughtDetails/ThoughtDetails";
import Auth from "./Pages/Auth/Auth";
import Top9List from "./Pages/Top9List/Top9List";
import Message from "./Components/Message/Message";

function App() {
	const [message, setMessage] = useState("");
	const { token, login, logout, userId } = useAuth();

	let ChangingRoutes;

	if (token) {
		ChangingRoutes = (
				<Route path={appRoutes.NEWTHOUGHT} element={<NewThought />} />
		);
	} else {
		ChangingRoutes = 
		(
				<Route path={appRoutes.AUTH} element={<Auth />} />
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				login: login,
				logout: logout,
				userId: userId,
				token: token,
			}}
		>
			<MessageContext.Provider
				value={{ message, setMessage }}
			>
				<Router>
					<div className="container">
						<Header />
						<Message />
						<Routes>
							<Route path={appRoutes.HOMEPAGE} exact element={<Homepage />} />
							<Route path={appRoutes.ALLTHOUGHTS} element={<Thoughts />} />
							<Route path={appRoutes.THOUGHTDETAILS} element={<ThoughtDetails />} />
							<Route path={appRoutes.TOP9LIST} element={<Top9List />} />
							<Route path={appRoutes.INCORRECTROUTE} element={<Navigate to={appRoutes.ALLTHOUGHTS} />} />
							{ChangingRoutes}
						</Routes>
					</div>
				</Router>
			</MessageContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
