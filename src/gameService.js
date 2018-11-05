const gameService = board => {
  const isWin = symbol => {
    const rowWin =
      board[0].every(cell => cell === symbol) ||
      board[1].every(cell => cell === symbol) ||
      board[2].every(cell => cell === symbol);

    const columnWin =
      board.every(cell => cell[0] === symbol) ||
      board.every(cell => cell[1] === symbol) ||
      board.every(cell => cell[2] === symbol);

    const diagonalWin1 =
      board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol;

    const diagonalWin2 =
      board[0][2] === symbol &&
      board[1][1] === symbol &&
      board[2][0] === symbol;

    return rowWin || columnWin || diagonalWin1 || diagonalWin2;
  };

  const isFilled = () => {
    return board.every(row => row.every(col => col !== ''));
  };

  if (isWin('X')) return 'X';
  if (isWin('O')) return 'O';
  if (isFilled()) return 'TIE';
};

export default gameService;
