const express = require("express");
const connectDb = require("./connect");
const app = express();
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");

connectDb();     // connection to mongoDB Atlas
dotenv.config(); //loading in the env in process object
  
// bring in routes
const postRoutes = require("./routes/post.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

//apiDocs
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

// when you seem authorized to server due to your network issue so server kicks you out
// app.use(function(err, req, res, next) {
//   if (err.name === "UnauthorizedError")
//     res.status(401).json({ error: "Unauthorized!" });
// });

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`A node JS API is Listening on port : ${port}`);
});
