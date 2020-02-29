const express = require("express");
const connectDb = require("./connect");
const app = express();
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

connectDb();
dotenv.config();

// bring in routes
const postRoutes = require("./routes/post.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError")
    res.status(401).json({ error: "Unauthorized!" });
});

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`A node JS API is Listening on port : ${port}`);
});
