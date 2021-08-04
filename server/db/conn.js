const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
