import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import Registration from '../Registration';
import Game from '../Game';
import PropTypes from 'prop-types';
import gameService from '../../gameService';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  state = {
    firstName: '',
    secondName: '',
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    winner: '',
    currentPlayer: 'X',
  };
  handleCellClick = (rowIndex, cellIndex) => {
    const board = this.state.board.map(row => [...row]);
    board[rowIndex][cellIndex] = this.state.currentPlayer;
    if (gameService(board) === this.state.currentPlayer) {
      this.setState({ winner: this.state.currentPlayer });
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({ board, currentPlayer: nextPlayer });
  };

  register = (firstName, secondName) => {
    this.setState({ firstName, secondName });
  };

  render() {
    const { firstName, secondName } = this.state;
    const registrationDone = firstName !== '' && secondName !== '';

    return (
      <div className={s.root}>
        {!registrationDone && <Registration onNewGame={this.register} />}
        {registrationDone && (
          <Game
            firstName={this.state.firstName}
            secondName={this.state.secondName}
            board={this.state.board}
            onCellClick={this.handleCellClick}
          />
        )}
        {this.state.winner && (
          <div data-hook="winner-message">{`${
            this.state.winner === 'X'
              ? this.state.firstName
              : this.state.secondName
          } won!`}</div>
        )}
      </div>
    );
  }
}

export default translate()(App);
