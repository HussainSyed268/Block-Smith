const { register, login } = require('../Controllers/AuthControllers')
const router = require('express').Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

module.exports = router;
