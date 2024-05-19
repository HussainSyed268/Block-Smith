const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret key", { expiresIn: maxAge });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", name: "", phone: ""};

  // Incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  // Incorrect password

  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  // Incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  // Incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //Any requiered field is empty
  if (err.message === "Please fill in all fields") {
    errors.email = "Please fill in all fields";
    errors.password = "Please fill in all fields";
    errors.name = "Please fill in all fields";
    errors.phone = "Please fill in all fields";
  }

  //Duplicate Phone Number

 
  return errors;
}

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    const user = await UserModel.create({ email, password, name, phone });
    const token = createToken(user._id);
    console.log(token);
    // Set the JWT token in a cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      maxAge: maxAge * 1000,
    });
    console.log(user._id);
    const user_details = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
    res.status(201).json({ user: user_details, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }


};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
  
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    // Set the JWT token in a cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      maxAge: maxAge * 1000,
    });
    console.log(user._id);
    const user_details = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
    res.status(200).json({ user: user_details, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors, created: false});
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/home");
}