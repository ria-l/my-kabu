import React from 'react';
import * as Utilities from './utilities';

class AddLot extends React.Component {
  state = { value: null, submitted: false };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitted(true);
    Utilities.addLotToPortfolio(this.state.value);
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add a stock:
            <input value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.props.submitted && <h1>{this.state.value}</h1>}
      </>
    );
  }
}

export default AddLot;
