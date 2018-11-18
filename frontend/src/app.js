import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    activeItem: "Home",
  }

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Navbar>
          <Navbar.Item name={"Home"} isActive={activeItem === "Home"} />
          <Navbar.Item name={"Profile"} isActive={activeItem === "Profile"} />
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" render={props => <Profile {...props} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
