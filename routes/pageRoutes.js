const express = require("express");
const router = express.Router();


function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }

  res.redirect("/login");
}

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.session.user
  });
});


module.exports = router;