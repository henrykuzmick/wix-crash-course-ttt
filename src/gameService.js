const gameService = board => {
  const isWin = symbol => {
    for (let i = 0; i < 3; i++) {
      if (board[i].every(cell => cell === symbol)) return true;
      if (board.every(cell => cell[i] === symbol)) return true;
    }

    const diagonalWin1 =
      board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol;

    const diagonalWin2 =
      board[0][2] === symbol &&
      board[1][1] === symbol &&
      board[2][0] === symbol;

    return diagonalWin1 || diagonalWin2;
  };

  const isFilled = () => {
    return board.every(row => row.every(col => col !== ''));
  };

  if (isWin('X')) return 'X';
  if (isWin('O')) return 'O';
  if (isFilled()) return 'TIE';
};

export default gameService;
