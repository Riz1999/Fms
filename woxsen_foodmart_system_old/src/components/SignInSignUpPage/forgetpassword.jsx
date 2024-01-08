import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ()=>{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [checkEmail, setcheckEmail] =useState(true)
    const [checkOtp, setCheckOtp] = useState(false);
    const [NewPassword, setPassword] = useState("");
    const [ConfirmNewPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");


    const EmailVarify = async () => {
        const response = await axios.post("http://localhost:5000/api/EmailVarify",
        {
            email,
        });
        console.log('response:',response)
        ToggleForm();
        
    }
    const ToggleForm = () => {
        setCheckOtp(true)
        setcheckEmail(false)
    }


    const handleOTPValidation = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/forgetPassword",
                {
                email,
                otp,
                NewPassword,
                }
            );
            console.log(response.data); // This should print the response from the server
            const { token, userId } = response.data;

            // Save the token and user ID in local storage or a state variable
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            navigate('/')// Call the onLoginSuccess function passed as a prop
        
        } catch (error) {
            console.log(error.response.data.message);
            
        }

    }

    return(
        <div>
            <h1>ForgetPassword</h1>
            {checkEmail && (
                <div>
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
                    <button
                        className="submit"
                        onClick={EmailVarify}
                    >
                        VarifyEmail
                    </button>
                </div>
            )}
            {checkOtp && (
                <div>
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
                    <label className="label">
                        <span className="span">New Password</span>
                        <input
                        className="input"
                        type="password"
                        name="password"
                        value={NewPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label className="label">
                        <span className="span">Confirm New Password</span>
                        <input
                        className="input"
                        type="password"
                        name="confirmPassword"
                        value={ConfirmNewPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button
                        className="submit"
                        onClick={handleOTPValidation}
                    >
                        Confirm
                    </button>

                </div>
            )}
        </div>
    )


}


export default ForgetPassword
