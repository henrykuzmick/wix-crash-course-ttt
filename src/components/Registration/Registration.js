import React from 'react';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';

class Registration extends React.Component {
  state = {
    firstName: '',
    secondName: '',
  };

  onChange = (name, event) => {
    const state = {};
    state[name] = event.target.value;
    this.setState(state);
  };

  render() {
    return (
      <FormField dataHook="registration-component" label="Players:" required>
        <Input
          type="text"
          value={this.state.firstName}
          dataHook="first-user-input"
          onChange={evt => this.setState({ firstName: evt.target.value })}
          placeholder="Player 1"
        />
        <Input
          type="text"
          value={this.state.secondName}
          dataHook="second-user-input"
          onChange={evt => this.setState({ secondName: evt.target.value })}
          placeholder="Player 2"
        />
        <Button
          dataHook="new-game"
          onClick={() =>
            this.props.onNewGame(this.state.firstName, this.state.secondName)
          }
        >
          New Game
        </Button>
      </FormField>
    );
  }
}

export default Registration;
