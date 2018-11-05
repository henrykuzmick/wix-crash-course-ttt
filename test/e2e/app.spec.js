const appDriver = page => ({
  navigate: () => page.goto(app.getUrl('/')),
  newGame: async (p1Name, p2Name) => {
    await page.type('[data-hook="first-user-input"]', p1Name);
    await page.type('[data-hook="second-user-input"]', p2Name);
    await page.click('[data-hook="new-game"]');
  },
  getFirstNameTitle: () =>
    page.$eval('[data-hook="p1-title"]', title => title.innerText),
  getSecondNameTitle: () =>
    page.$eval('[data-hook="p2-title"]', title => title.innerText),
  clickACellAt: index =>
    page.$$eval('td', (cells, _index) => cells[_index].click(), index),
  getCellAt: index =>
    page.$$eval('td', (cells, _index) => cells[_index].innerHTML, index),
  getWinnerMessage: () =>
    page.$eval('[data-hook="winner-message"]', msg => msg.innerText),
  hasWinner: async () => !!(await page.$('[data-hook="winner-message"]')),
  isGameShown: async () =>
    !!(await page.$$('[data-hook="game-component"]')).length,
});

describe('React application', () => {
  let driver;
  beforeEach(() => (driver = appDriver(page)));
  it('should register a game', async () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    await driver.navigate();
    await driver.newGame(p1Name, p2Name);

    expect(await driver.getFirstNameTitle()).toEqual(p1Name);
    expect(await driver.getSecondNameTitle()).toEqual(p2Name);
  });

  it('should show "X" after first player clicks', async () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    await driver.navigate();
    await driver.newGame(p1Name, p2Name);
    expect(await driver.getCellAt(0)).toBe('');
    await driver.clickACellAt(0);
    expect(await driver.getCellAt(0)).toBe('X');
  });

  it('first player should win the game', async () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    await driver.navigate();
    await driver.newGame(p1Name, p2Name);
    await driver.clickACellAt(0);
    await driver.clickACellAt(3);
    await driver.clickACellAt(1);
    await driver.clickACellAt(4);
    expect(await driver.hasWinner()).toBe(false);
    await driver.clickACellAt(2);
    expect(await driver.getWinnerMessage()).toBe(`${p1Name} won!`);
  });

  it('Only displays the game after registration', async () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    await driver.navigate();
    expect(await driver.isGameShown()).toBe(false);
    await driver.newGame(p1Name, p2Name);
    expect(await driver.isGameShown()).toBe(true);
  });
});
