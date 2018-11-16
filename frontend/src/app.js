import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Input, Menu } from "semantic-ui-react";

import Home from "./components/pages/home";
import Profile from "./components/pages/profile";

class App extends Component {
  constructor() {
    super();
    this.state = { activeItem: "home" };
  }

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Menu pointing>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={() => this.handleItemClick("home")} />
          <Menu.Item
            name="messages"
            active={activeItem === "messages"}
            onClick={() => this.handleItemClick("messages")} />
          <Menu.Item
            name="friends"
            active={activeItem === "friends"}
            onClick={() => this.handleItemClick("friends")} />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
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
