import React from 'react';
import styles from './Game.scss';

class Game extends React.Component {
  state = {};
  render() {
    const {
      firstName,
      secondName,
      board,
      onCellClick,
      currentPlayer,
    } = this.props;
    return (
      <div data-hook="game-component">
        <div className={styles.players}>
          <span data-hook="p1-title">{firstName}</span>
          <span data-hook="p2-title">{secondName}</span>
        </div>
        <p data-hook="next-player">next turn: {currentPlayer}</p>
        <table>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    onClick={() => onCellClick(rowIndex, cellIndex)}
                    key={cellIndex}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Game;
