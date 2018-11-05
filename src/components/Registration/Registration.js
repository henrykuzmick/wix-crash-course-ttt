import React from 'react';

class Registration extends React.Component {
  state = {
    firstName: '',
    secondName: '',
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.firstName}
          data-hook="first-user-input"
          onChange={evt => this.setState({ firstName: evt.target.value })}
        />
        <input
          type="text"
          value={this.state.secondName}
          data-hook="second-user-input"
          onChange={evt => this.setState({ secondName: evt.target.value })}
        />
        <button
          data-hook="new-game"
          onClick={() =>
            this.props.onNewGame(this.state.firstName, this.state.secondName)
          }
        >
          New Game
        </button>
      </div>
    );
  }
}

export default Registration;
