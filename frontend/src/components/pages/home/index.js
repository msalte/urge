import React, { Component } from "react";
import styles from "./styles.scss";
import SearchBar from "../../SearchBar";

class HomePage extends Component {
  state = {
    query: ""
  };

  render() {
    const { query } = this.state;

    return (
      <div className={styles.container}>
        Home page
        <SearchBar onQueryChanged={query => this.setState({ query })} />
        {query}
      </div>
    );
  }
}

export default HomePage;
