const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword, address } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/register");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      req.flash("error", "Email already exists");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      address
    });

    req.flash("success", "Registration successful! Please login.");
    return res.redirect("/login");

  } catch (error) {
    console.log(error);
    req.flash("error", "Registration failed. Please try again.");
    return res.redirect("/register");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    req.flash("success", "Login successful!");
    return res.redirect("/dashboard");

  } catch (error) {
    console.log(error);
    req.flash("error", "Login failed. Please try again.");
    return res.redirect("/login");
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;




// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password, confirmPassword, address } = req.body;

//     if (password !== confirmPassword) {
//       return res.send("Passwords do not match");
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.send("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       address
//     });

//     res.redirect("/dashboard");
//   } catch (error) {
//     console.error(error);
//     res.send("Registration failed");
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.send(`
//         <h2>Invalid email or password</h2>
//         <a href="/login">Try again</a>
//       `);
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) {
//       return res.send(`
//         <h2>Invalid email or password</h2>
//         <a href="/login">Try again</a>
//       `);
//     }

//     res.redirect("/dashboard");
//   } catch (error) {
//     console.error(error);
//     res.send("Login failed");
//   }
// });

// module.exports = router;