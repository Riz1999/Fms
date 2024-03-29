// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
process.env.NODE_ENV = "development";
// POST /api/signup
const otpMap = new Map();
var IfForget 

router.post("/EmailVarify", async (req, res) => {
  //request from body
  const {email} = req.body 
  try{
    // check dose email exists or not !
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = await sendEmail(
      email,
      "Verify Email",
      "To verify your account please enter the OTP in our site"
    );
    otpMap.set(user._id.toString(), otp);
    IfForget = otp
    console.log(otp)

    res
    .status(201)
    .json({ message: "An Email sent to your account please verify" });
  
  } catch (error){
    res
    .status(404)
    .json({
      maessage: `something went worng:${error}`
    })
  }
  
})
 
router.post("/forgetPassword", async (req, res) => {
  const { email, otp, NewPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (otp !== IfForget) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Ensure that otpMap is set up correctly and working
    if (!otpMap.has(user._id.toString())) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    const userId = user.id;
    otpMap.delete(user._id.toString());

    // Hash the new password before updating
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(NewPassword, salt);

    await User.updateOne({ _id: userId }, { $set: { password: hash } });
    user.verified = true;
    await user.save();

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Password changed successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ email, password, name });
    const user = await newUser.save();
    console.log(user);
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    // await sendEmail(user.email, "Verify Email", url);

    // Generate and send the OTP in the email
    const otp = await sendEmail(
      email,
      "Verify Email",
      "To verify your account please enter the OTP in our site"
    );
    otpMap.set(user._id.toString(), otp);
    //console.log(otp);

    res
      .status(201)
      .json({ message: "An Email sent to your account please verify" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" , password});
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h", // Token expiration time (optional)
    });

    // Return the user ID along with the token in the response
    return res.status(200).json({
      message: "Login success",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error",error:error });
  }
});

// Add more user-related routes if needed
router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ maessage: "Invalid Link" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "invalid link" });
    await User.updateOne({ _id: user._id, verified: true });
    await token.remove();
    res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {}
});
router.post("/otp/validate", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get OTP from cache using user's ID
    const cachedOTP = otpMap.get(user._id.toString());

    if (!cachedOTP || otp !== cachedOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark the user as verified (you can add a verified field to your User model)
    user.verified = true;
    await user.save();
    setTimeout(() => {
      otpMap.delete(user._id.toString());
    }, 600000);

    // Generate a JWT token for the user and send it as a response
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h", // Token expiration time (optional)
    });

    return res.status(200).json({
      message: "OTP validation successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
