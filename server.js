const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config();

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false
}));


app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


// Routes
const pageRoutes = require("./routes/pageRoutes");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

app.use("/", pageRoutes);
app.use("/", authRoutes);
app.use("/api", newsRoutes);
app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});













// const express = require("express");
// const path = require("path");


// const app = express();
// const PORT = 3000;

// // Set EJS as view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Serve static files (CSS, JS, images)
// app.use(express.static(path.join(__dirname, "public")));

// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get("/", (req, res) => {
//   res.render("index"); // renders views/index.ejs
// });


// // Handle Register
// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.post("/register", (req, res) => {
//   const { username, email, password, confirmPassword, address } = req.body;

//   if (password !== confirmPassword) {
//     return res.send("Passwords do not match");
//   }

//   res.send("Registration submitted successfully");
// });




// // Show login page
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// // Handle login
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // TEMP logic (you'll replace this later with database)
//   if (email === "test@gmail.com" && password === "1234") {
//     return res.send("Login successful ✅");
//   }

//   res.send("Invalid email or password ❌");
// });




// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
