require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
require("./db/conn");
const user_router = require("./router/user");
const contact_router = require("./router/contact");

app.use(
  cors({
    origin: "http://127.0.0.1:4000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const imagePath = path.join(__dirname, "images");
app.use(express.static(imagePath));
app.use(contact_router);
app.use(user_router);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is running at Port:${PORT}`);
});
