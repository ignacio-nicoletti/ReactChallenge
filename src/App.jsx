import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import DetailCard from "./components/detailCard/DetailCard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={Home} />
        
        <Route  path="/:id" Component={DetailCard} />
      </Routes>
    </>
  );
}
export default App;
