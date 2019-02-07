import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    query: "",
    isSpinning: false
  };

  timeout = null;

  onChange(query) {
    this.setState({ query, isSpinning: true });
    const { onQueryChanged } = this.props;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      onQueryChanged(query);
      this.setState({ isSpinning: false });
    }, 300);
  }

  render() {
    const { isSpinning } = this.state;

    return (
      <div>
        <input
          type="search"
          placeholder="Type here to search..."
          onChange={e => this.onChange(e.target.value)}
        />
        {isSpinning && "Searching..."}
      </div>
    );
  }
}

export default SearchBar;
