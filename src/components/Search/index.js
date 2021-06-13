import React from "react";
import { withRouter } from "react-router";
import { SearchInput } from "./Search.styles";

class Search extends React.Component {
  state = {
    inputValue: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ inputValue: "" });
    this.props.history.push(`/search/photos/${this.state.inputValue}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SearchInput
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
      </form>
    );
  }
}

export default withRouter(Search);
