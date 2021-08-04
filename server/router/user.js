const User = require("../models/users");
const Contact = require("../models/contacts");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

class UsersData {
  async read({ userId }) {
    try {
      const data = await User.find({ userId }, { _id: 0, __v: 0 }); // getting all the data stored in database
      if (data.length == 0)
        return {
          success: false,
          message: "There exists no user data",
          data: data,
        };
      else
        return {
          success: true,
          message: "User data fetched successfully",
          data: data,
        };
    } catch (err) {
      return {
        success: false,
        message: err,
        data: null,
      };
    }
  }

  async searchUser({ email }) {
    try {
      const result = await User.find({ email }, { _id: 0, __v: 0 }); // getting all the data stored in database
      if (result.length == 0) return { userExists: false };
      else return { userExists: true };
      // if(result.length == 0)
      // return {
      //     success:false,
      //     message:'There exists no user data',
      //     data:data
      // }
      // else
      // return {
      //     success:true,
      //     message:'User data fetched successfully',
      //     data:data
      // }
    } catch (err) {
      return {
        success: false,
        message: err,
        data: null,
      };
    }
  }

  async delete({ userId }) {
    try {
      await User.deleteOne({ userId });
      return {
        success: true,
        message: `Deleted user with id:${userId}`,
      };
    } catch (err) {
      return {
        success: true,
        message: err,
      };
    }
  }
}

// All routes for user

//search for existing user , useful when someone who is already registered
// is again trying to register
router.get("/searchUser", async (req, res) => {
  const user = new UsersData();
  const search = await user.searchUser(req.query);
  if (search.userExists) res.status(200).json(search.userExists);
  else res.status(200).json(search.userExists);
});

// get a single user according to the passed userId
router.get("/getUser", async (req, res) => {
  const user = new UsersData();
  const readUserData = await user.read(req.query);
  if (readUserData.success) res.status(200).json(readUserData.data);
  else res.status(404).json(readUserData.message);
});

//home page , the page which requires the token
router.get("/home", auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: req.userData,
  });
});

// logout the user according to the passed userId
router.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("userJWT");
    await req.userData.save();
    res.status(200).json({
      success: true,
      message: `Logged Out ${req.userData.name}`,
      data: req.userData, // change to null later
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: `${error.type} , ${error.message}`,
      data: null,
    });
  }
});

// create a new user according to the passed name , email , pass
router.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    //Getting all previous user data
    const allUsers = await User.find();
    const userExists = await User.findOne({ email });
    if (userExists == null) {
      const registerUser = new User({
        userId:
          allUsers.length == 0 ? 0 : allUsers[allUsers.length - 1].userId + 1,
        contactGroups: [],
        name,
        email,
        pass,
      });
      //creating a jwt token
      const token = await registerUser.generateAuthToken();
      //creating a cookie with the help of a token
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      //Saving new user to the database
      await registerUser.save();
      res.status(200).json({
        success: true,
        message: "New user created successfully",
        data: null,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
}); //done!!!!

// login the user according to the passed userId
router.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const userData = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(pass, userData.pass);
    if (passwordMatch) {
      const token = await userData.generateAuthToken();
      res.cookie("userJWT", token, {
        expires: new Date(Date.now() + 1200000),
        httpOnly: true,
        secure: false,
        sameSite: false,
      });
      res.status(200).json({
        success: true,
        message: "User login successful",
        data: userData,
      });
    } else
      res.status(200).json({
        success: false,
        message: "INVALID CREDENTIALS",
        data: null,
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `${err.type} , ${err.message}`,
    });
  }
}); // done!!!

module.exports = router;
/*

API End Points along with the required query parameters

1. 

2. http://localhost:3000/register/?name={valid name}&email={valid email}&pass={valid password}

3. 

4. http://localhost:3000/userLogin/?userId={valid user id}

5. http://localhost:3000/userLogout/?userId={valid user id}

6.

*/
