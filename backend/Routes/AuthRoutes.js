const { register, login } = require('../Controllers/AuthControllers')
const {checkUser} = require('../Middlewares/AuthMiddleware')
const router = require('express').Router();

router.post("/home", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
