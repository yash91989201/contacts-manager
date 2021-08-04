import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Switch>
          <Route path="/intro" component={Intro}></Route>
          <UserProvider>
            <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          </UserProvider>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </AuthProvider>
    </>
  );
};
export default App;
