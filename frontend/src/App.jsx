import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SignUp from "./SignUp";
import LoginForm from "./components/Login";
import Home from "./components/Home";
import Reports from "./components/Reports";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/report" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
