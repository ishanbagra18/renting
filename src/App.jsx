import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import UserProfileForm from "./UserProfileForm";
import Dashboard from "./Dashboard"; 
import Tenant from "./Tenant";
import Landload from "./Landload";
import Contract from "./components/Contract";
import Proceedtopay from "./components/Proceedtopay";
import RateContract from "./components/RateContract";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<UserProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/landlord" element={<Landload />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/Proceedtopay" element={<Proceedtopay />} />
        <Route path="/rate-contract" element={<RateContract />} />

      </Routes>
    </Router>
  );
};

export default App;
