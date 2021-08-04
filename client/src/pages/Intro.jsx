import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/intro.module.css";
const Home = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <i
            style={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              fontSize: "3.5rem",
            }}
            className="fas fa-address-book"
          ></i>
          Digital Phone book
        </div>

        <div className={styles.btn_container}>
          <button className={styles.login_btn}>
            <Link to="/login">Login</Link>
          </button>
          <button className={styles.signup_btn}>
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
      <div className={styles.main_content}>
        <span className={styles.text}>Your digital phonebook</span>
        <img className={styles.main_img} src="" alt="" />
        <div className={styles.description}>
          <div>Store all your contacts in one place and never loose them</div>
          <div>
            Create categories for different types of contacts like - work ,
            family and many more...
          </div>
          <div>And search according to name , email , phone number</div>
        </div>

        <button className={styles.signup_now}>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </>
  );
};

export default Home;
