import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";

const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <img src="user.svg" alt="" />

        <div className={styles.login}>Login</div>
        <form className={styles.login_form} id="login_form">
          <input
            id="email"
            className={styles.email}
            type="email"
            placeholder="Enter your email"
          />
          <input
            onfocus="checkUserEmail()"
            id="password"
            className={styles.password}
            type="password"
            placeholder="Enter password"
          />
          <input
            id="login_btn"
            type="submit"
            value="Login"
            className={styles.login_btn}
          />
          <div id="popUp">
            <span>User doesnot exists , Signup</span>
            <button className={styles.signup_here}>
              <Link to="/signup">Here</Link>
            </button>
          </div>
        </form>
        <div id="popUp">User does not exists</div>
      </div>
    </>
  );
};

export default Login;
