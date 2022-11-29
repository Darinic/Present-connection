import React, {useState} from "react";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllThoughts from "./pages/AllThoughts/AllThoughts";
import NewThought from "./pages/NewThought/NewThought";
import ThoughtDetails from "./pages/ThoughtDetails/ThoughtDetails";
import {appRoutes} from "./core/routes/routes";
import RouteRenderer from "./core/routes/route-renderer";


function App() {
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };


  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path={appRoutes.HOMEPAGE} exact element={<Homepage />} />
          <Route path={appRoutes.ALLTHOUGHTS} element={<AllThoughts />} />
          <Route path={appRoutes.NEWTHOUGHT} element={<NewThought />} />
          <Route path={appRoutes.THOUGHTDETAILS} element={<ThoughtDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
