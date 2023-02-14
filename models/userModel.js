const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

//Schema for the user collection in the database
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //This makes sure an email addresses wouldn't be registered twice on the database
  },
  password: {
    type: String,
    required: true,
  },
});

//Static Signup Method
userSchema.statics.signup = async function (fullname, email, password) {
  console.log(arguments); //Testing Output from postman POST requests
  if (!fullname || !email || !password) {
    throw Error("All field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  //Creating Hashing constants
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //This helps create the user signup with the client provided fullname, email and a hashed password that would be sent to the database
  const user = await this.create({ fullname, email, password: hash });

  return user;
};

//Static Login Method. NB: A regular function style and not an arrow fuction is needed
userSchema.statics.login = async function (email, password) {
  //Validation for email and password
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email or password");
  }

  //compares password with hashed password in the database
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect email or password");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);
