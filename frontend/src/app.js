import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Navbar from "./components/Navbar";
import styles from "./global/scss/app.scss";


class App extends Component {
  state = {
    activeItem: "Home",
  }

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Navbar>
          <Navbar.Item name={"Home"} isActive={activeItem === "Home"} />
          <Navbar.Item name={"Profile"} isActive={activeItem === "Profile"} />
        </Navbar>
        <div className={styles.container}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" render={props => <Profile {...props} />} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById("app"));