import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import { appRoutes } from "./constants/routes";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import Homepage from "./pages/Homepage/Homepage";
import AllThoughts from "./pages/AllThoughts/AllThoughts";
import NewThought from "./pages/NewThought/NewThought";
import ThoughtDetails from "./pages/ThoughtDetails/ThoughtDetails";
import Auth from "./pages/Auth/Auth";
import Top9Thoughts from "./pages/Top9Thoughts/Top9Thoughts";

function App() {
  const { token, login, logout, userId } = useAuth();

  const constantRoutes = (
    <>
      <Route path={appRoutes.HOMEPAGE} exact element={<Homepage />} />
      <Route path={appRoutes.ALLTHOUGHTS} element={<AllThoughts />} />
      <Route path={appRoutes.THOUGHTDETAILS} element={<ThoughtDetails />} />
      <Route path={appRoutes.TOP9THOUGHTS} element={<Top9Thoughts />} />
      <Route
        path={appRoutes.INCORRECTROUTE}
        element={<Navigate to={appRoutes.ALLTHOUGHTS} />}
      />
    </>
  );

  let ChangingRoutes;

  if (token) {
    ChangingRoutes = (
      <>
        {constantRoutes}
        <Route path={appRoutes.NEWTHOUGHT} element={<NewThought />} />
      </>
    );
  } else {
    ChangingRoutes = (
      <>
        {constantRoutes}
        <Route path={appRoutes.AUTH} element={<Auth />} />
      </>
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
      <Router>
        <div className="container">
          <Header />
          <Routes>{ChangingRoutes}</Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
