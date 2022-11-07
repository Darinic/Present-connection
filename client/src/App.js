import React, {useState} from "react";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllThoughts from "./components/Allthoughts/AllThoughts";
import NewThought from "./components/NewThought/NewThought";
import ThoughtDetails from "./components/ThoughtDetails/ThoughtDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <Router>
      <div className="container">
        <Header handleSearch={handleSearch} />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/allthoughts" element={<AllThoughts searchTerm={searchTerm} />} />
          <Route path="/newthought" element={<NewThought />} />
          <Route path="/thoughtdetails/:id" element={<ThoughtDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
