const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "secret key", { expiresIn: maxAge });
}

module.exports.register = async (req, res, next) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        if (!name || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await UserModel.create({ email, password, name, phone });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        });
        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Handle successful login
    } catch (err) {
        // Handle errors
    }
}
