import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import ChooseBattle from "./Components/ChooseBattle";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
        <ToastContainer autoClose={1000} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/select-battle" component={ChooseBattle} />
          <Route exact path="/battle/:id" component={Home} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
