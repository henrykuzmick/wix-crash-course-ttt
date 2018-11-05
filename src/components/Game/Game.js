import React from 'react';
import Text from 'wix-style-react/Text';
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
          <Text size="medium" data-hook="p1-title">
            {firstName}
          </Text>
          <Text size="medium" data-hook="p2-title">
            {secondName}
          </Text>
        </div>
        <Text size="small" data-hook="next-player">
          next turn: {currentPlayer}
        </Text>
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
