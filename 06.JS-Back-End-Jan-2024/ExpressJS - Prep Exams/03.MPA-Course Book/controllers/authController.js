const router = require("express").Router();
const validator = require("validator");

const { login, register } = require("../services/authService");
const { parseError } = require("../utils/parser");

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login Page",
  });
});

router.post("/login", async (req, res) => {
  try {
    if (
      validator.isEmpty(req.body.email) ||
      validator.isEmpty(req.body.password)
    ) {
      throw new Error("All fields are required");
    }

    const token = await login(req.body.email, req.body.password);

    res.cookie("jwt", token, { httpOnly: true }, { maxAge: 360000 });

    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    res.render("login", {
      title: "Request Error",
      errors,

      body: {
        email: req.body.email,
      },
    });
  }
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
});

router.post("/register", async (req, res) => {
  try {
    if (
      validator.isEmpty(req.body.email) ||
      validator.isEmpty(req.body.password)
    ) {
      throw new Error("All fields are required");
    }

    if (validator.isEmail(req.body.email) == false) {
      throw new Error("Invalid email!");
    }

    if (validator.isLength(req.body.username, { min: 2 }) == false) {
      throw new Error("Username should be at least 2 characters");
    }

    if (validator.isLength(req.body.password, { min: 4 }) == false) {
      throw new Error("Password should be at least 4 characters long");
    }

    if (validator.equals(req.body.password, req.body.rePassword) == false) {
      throw new Error("Passwords don't match");
    }

    const token = await register(
      req.body.email,
      req.body.username,
      req.body.password
    );

    res.cookie("jwt", token, { httpOnly: true }, { maxAge: 360000 });

    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    res.render("register", {
      title: "Request Error",
      errors,

      body: {
        email: req.body.email,
        username: req.body.username,
      },
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
});

module.exports = router;
