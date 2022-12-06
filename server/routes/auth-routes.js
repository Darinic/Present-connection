const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const usersControllers = require("../controllers/auth-controllers");

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 7 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

module.exports = router;
