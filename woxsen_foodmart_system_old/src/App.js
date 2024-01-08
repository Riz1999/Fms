import React, { useState } from "react";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from "./components/Pages/UserPage";
import SignInSignUpPage from "./components/SignInSignUpPage/SignInSignUpPage";
import AdminPage from "./components/Pages/AdminPage";
import ForgetPassword from "./components/SignInSignUpPage/forgetpassword";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
        <>
        <Router>
          <Routes>
            <Route path='/' element={<SignInSignUpPage />} />
            <Route path='/selectfood' element={<UserPage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
          </Routes>
        </Router>
        </>
    </div>
  );
};

export default App;

