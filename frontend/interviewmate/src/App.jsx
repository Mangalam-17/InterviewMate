import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewMate from "./pages/InterviewMate/InterviewMate";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* {default Route} */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interview-mate/:sessionId"
            element={<InterviewMate />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
