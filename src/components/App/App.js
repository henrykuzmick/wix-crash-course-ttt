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
    if (board[rowIndex][cellIndex] !== '') return;

    board[rowIndex][cellIndex] = this.state.currentPlayer;

    if (gameService(board) === 'TIE') {
      this.setState({ winner: 'TIE' });
    } else {
      if (gameService(board) === this.state.currentPlayer) {
        this.setState({ winner: this.state.currentPlayer });
      }
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
    let endMessage = '';

    switch (this.state.winner) {
      case 'X':
        endMessage = `${this.state.firstName} won!`;
        break;
      case 'O':
        endMessage = `${this.state.secondName} won!`;
        break;
      case 'TIE':
        endMessage = 'TIE';
        break;
      default:
        endMessage = '';
    }

    return (
      <div className={s.root}>
        {!registrationDone && <Registration onNewGame={this.register} />}
        {registrationDone && (
          <Game
            currentPlayer={this.state.currentPlayer}
            firstName={this.state.firstName}
            secondName={this.state.secondName}
            board={this.state.board}
            onCellClick={this.handleCellClick}
          />
        )}
        {this.state.winner && (
          <div data-hook="winner-message">{endMessage}</div>
        )}
      </div>
    );
  }
}

export default translate()(App);
