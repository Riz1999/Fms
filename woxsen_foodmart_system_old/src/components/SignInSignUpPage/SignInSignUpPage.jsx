import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./SignInSignUp.css";

const SignInSignUpPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // New state for OTP
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To track if OTP is sent
  const [showAdminUI, setShowAdmin] = useState(false);

  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
    setError("");
  };

  const handleSignIn = async () => {
    try {
       //Need to update with NEW DB 
          if(email=='rizwan.zhad@woxsen.edu.in' && password=='123456'){
            const response = await axios.post("http://localhost:5000/api/login", {
              email,
              password,
            });
            console.log('from if :::'+showAdminUI);
            console.log(response.data); // This should print the response from the server
            const { token, userId } = response.data;
      
            // Save the token and user ID in local storage or a state variable
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("showAdminUI", true);
            navigate('/admin')
            // onLoginSuccess();
          }
      else{
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log('from else :::'+showAdminUI); 
      console.log(response.data); // This should print the response from the server
      const { token, userId } = response.data;

      // Save the token and user ID in local storage or a state variable
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("showAdminUI", false);
      navigate('/selectfood')
      // onLoginSuccess(); // Call the onLoginSuccess function passed as a prop

    }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSignUp = async () => {
    // if (!email.endsWith("woxsen.edu.in")) {
    //   setError("Only woxsen.edu.in emails are supported.");
    //   return;
    // }
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
      });
      console.log(response.data); // This should print the response from the server
      setOtpSent(true); // Set otpSent to true after successful sign up
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const handleForgetPas= () => {
    navigate('/forgetpassword')
  };
  const handleOTPValidation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/otp/validate",
        {
          email,
          otp,
        }
      );
      console.log(response.data); // This should print the response from the server
      const { token, userId } = response.data;

      // Save the token and user ID in local storage or a state variable
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      onLoginSuccess(); // Call the onLoginSuccess function passed as a prop
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="body">
      <div className={`cont ${showSignUp ? "s-signup" : ".cont"}`}>
        <div className="form sign-in">
          <h2>Sign In</h2>
          <br />
          {!showAdminUI &&(
          <>
          <label className="label">
            <span className="span">WOXSEN Email Address</span>
            <input
              className="input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label">
            <span className="span">Password</span>
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </>
          )}
          {!otpSent &&!showAdminUI && (
            <button className="submit" type="button" onClick={handleSignIn}>
              Sign In
            </button>
          )}
          {otpSent && (
            <>
              <label className="label">
                <span className="span">OTP</span>
                <input
                  className="input"
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </label>
              <button
                className="submit"
                type="button"
                onClick={handleOTPValidation}
              >
                Validate OTP
              </button>
            </>
          )}
           {!showAdminUI && (
              <>
          <button
            className="submit"
            type="button"
            onClick={handleForgetPas}
            >
            Forgot Password ?
          </button>
          
          </>
           )}
        </div>

        <div className="sub-cont">
          <div className="img">
            <div className="img-text m-up">
              <br />
              <br />
              <h2>New here?</h2>
              <p>
                Sign up if you are new here! and explore woxsen food management
              </p>
            </div>
            <div className="img-text m-in">
              <h2>Already have an Account</h2>
              <br />
              <br />
              <p>
                If you already have an account, just sign in. We've missed you!
              </p>
            </div>
            <div className="img-btn" onClick={handleToggleForm}>
              <span className="m-up">Sign Up</span>
              <span className="m-in">Sign In</span>
            </div>
          </div>
          {showSignUp && !otpSent && (
            <div className="form sign-up">
              <h2>Sign Up</h2>
              <label className="label">
                <span className="span">Name</span>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="label">
                <span className="span">WOXSEN Mail</span>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="label">
                <span className="span">Password</span>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="label">
                <span className="span">Confirm Password</span>
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <button type="button" className="submit" onClick={handleSignUp}>
                Sign Up Now
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
          {showSignUp &&
            otpSent && ( // Add this condition to show OTP validation form
              <div className="form sign-up">
                <h2>Verify Email</h2>
                <label className="label">
                  <span className="span">Enter OTP</span>
                  <input
                    className="input"
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  className="submit"
                  onClick={handleOTPValidation}
                >
                  Verify OTP
                </button>
                {error && <p className="error">{error}</p>}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpPage;
