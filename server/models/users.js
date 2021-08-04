const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  pass: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//creating a middle ware for generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

//creating a middleware to hash the password before storing it to the database
userSchema.pre("save", async function (req, res, next) {
  if (this.isModified("pass")) {
    this.pass = await bcrypt.hash(this.pass, 10);
  }
  next();
});

const User = new mongoose.model("user", userSchema);
module.exports = User;
