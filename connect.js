const mongoose = require("mongoose");

const URI =
  "mongodb+srv://jaffer:fMlMbAprMZ65Z6UF@nodeapi-al9by.mongodb.net/test?retryWrites=true&w=majority";

//db
mongoose.Promise = global.Promise;

const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log("DB Connected!"))
    .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
    });
};

module.exports = connectDB;
