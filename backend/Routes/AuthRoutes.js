const { register, login } = require('../Controllers/AuthControllers')
const {checkUser} = require('../Middlewares/AuthMiddleware')
const router = require('express').Router();

router.post("/home", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
