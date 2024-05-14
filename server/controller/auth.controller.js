import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const bcryptPassword = bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: bcryptPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (user) {
      // User exists, generate JWT token for authentication
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour (adjust as needed)
      });

      // Remove sensitive fields (e.g., password) before sending the response
      const { password, ...userData } = user._doc;

      // Send token and user data in response
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(userData);
    } else {
      // User doesn't exist, create a new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new User({
        username: name ,
        email,
        password: hashedPassword,
        avatar: photo
      });

      await newUser.save();

      // Generate JWT token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour (adjust as needed)
      });

      // Remove sensitive fields (e.g., password) before sending the response
      const { password, ...userData } = newUser._doc;

      // Send token and user data in response
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(userData);
    }
  } catch (error) {
    next(error); // Forward the error to the global error handler
  }
};

export const signOut= async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out')
  } catch (error) {
    next(error)
  }
}

