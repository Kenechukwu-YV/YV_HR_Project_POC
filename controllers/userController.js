const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Function to create Token that can be reused upon every user signup
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" }); //Creating a token that expires in 1days
};

//Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password);
    
        //Creating a token
        const token = createToken(user._id);
    
        res.status(200).json({ email, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

//Signup User
const signupUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await User.signup(fullname, email, password);

    //Creating a token
    const token = createToken(user._id);

    res.status(200).json({ fullname, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
