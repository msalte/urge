import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Navbar, { navbarItems } from "./components/Navbar";
import styles from "./global/scss/app.scss";

class App extends Component {
  state = {
    activeItem: navbarItems[0].name,
  }

  onClickItem(activeItem) {
    console.log(activeItem);
    this.setState({ activeItem });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Navbar>
          {navbarItems.map((item, key) => (
            <Navbar.Item key={key} item={item} isActive={activeItem === item.name} onClick={(name) => this.onClickItem(name)} />
          ))}
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