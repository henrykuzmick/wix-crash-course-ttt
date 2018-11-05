import gameService from './gameService';

test('X should win the game', () => {});

describe('Winning scenarios', () => {
  it('wins using rows', () => {
    const b1 = [['X', 'X', 'X'], ['', '', ''], ['', '', '']];
    const b2 = [['', '', ''], ['X', 'X', 'X'], ['', '', '']];
    const b3 = [['', '', ''], ['', '', ''], ['X', 'X', 'X']];

    expect(gameService(b1)).toBe('X');
    expect(gameService(b2)).toBe('X');
    expect(gameService(b3)).toBe('X');
  });

  it('wins using columns', () => {
    const b1 = [['X', '', ''], ['X', '', ''], ['X', '', '']];
    const b2 = [['', 'X', ''], ['', 'X', ''], ['', 'X', '']];
    const b3 = [['', '', 'X'], ['', '', 'X'], ['', '', 'X']];

    expect(gameService(b1)).toBe('X');
    expect(gameService(b2)).toBe('X');
    expect(gameService(b3)).toBe('X');
  });

  it('wins diagonally', () => {
    const b1 = [['X', '', ''], ['', 'X', ''], ['', '', 'X']];
    const b2 = [['', '', 'X'], ['', 'X', ''], ['X', '', '']];
    expect(gameService(b1)).toBe('X');
    expect(gameService(b2)).toBe('X');
  });
});

describe('Tie scenarios', () => {
  it('Ties when all cells are filled, but no winner exists', () => {
    const board = [['X', 'Y', 'X'], ['X', 'Y', 'X'], ['Y', 'X', 'Y']];
    expect(gameService(board)).toBe('TIE');
  });
});
