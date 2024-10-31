import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SignUp from "./SignUp";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
