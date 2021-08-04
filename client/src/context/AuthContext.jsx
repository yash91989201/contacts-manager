import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);

  //new user sign up
  async function signUp(userData) {
    // const option = {
    //   method: "POST",
    //   body: JSON.stringify(getFormData("signup_form")),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      //   const res = await fetch("http://localhost:3000/register", option);
      //   const userSignup = await res.json();
      //   if (userSignup.success) {
      //     alert("User Registered successfully");
      //     window.location.href = "http://127.0.0.1:4000/client/login.html";
      //   }
    } catch (err) {
      alert("Oops ,Something went wrong !!! Please try again");
      console.log(err);
    }
  }

  //user login with jwtToken
  async function login() {
    try {
      const option = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "http://localhost:3000",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials",
        },
      };
      const res = await fetch("http://localhost:3000/home", option);
      const userData = await res.json();
      if (res.status == 200) {
        // userID = userData.data.userId;
        // fetchContacts(userData.data.userId);
        // clearSearchBox();
        setCurrentUser(userData.data.userId);
      } else {
        setCurrentUser("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //user logout
  async function logout() {
    // const wantToLogout=confirm('Do you want to log out ?');
    // if (wantToLogout) {
    //   try {
    //     const option = {
    //       method: "GET",
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         Origin: "http://localhost:3000",
    //         "Access-Control-Allow-Credentials": true,
    //         "Access-Control-Allow-Headers":
    //           "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials",
    //       },
    //     };
    //     const res = await fetch("http://localhost:3000/logout", option);
    //     const userLogout = await res.json();
    //     if (userLogout.success) {
    //       window.location.href = "http://127.0.0.1:4000/client/intro.html";
    //     } else {
    //       alert(userLogout.message);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }

  const value = {
    currentUser,
    signUp,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
};
