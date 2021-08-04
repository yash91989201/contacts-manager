import React, { useState } from "react";
import styles from "../styles/signup.module.css";

const SignUp = () => {
  const [error, setError] = useState("");
  return (
    <>
      <div className="container">
        <img src="./public/user.svg" alt="" />
        <div className="signup">Signup</div>
        <form className="signup_form" id="signup_form" method="POST">
          <input type="text" className="name" />
          <input type="text" className="email" />
          <input type="text" className="password" />
          <input type="text" className="c_password" />
          <input type="submit" className="name" value="SignUp" />
        </form>
        <div className="text">Already a User? Login Here.</div>
      </div>
    </>
  );
};

export default SignUp;
