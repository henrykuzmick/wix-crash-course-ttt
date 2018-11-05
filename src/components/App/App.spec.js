import React from 'react';
import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from '../../../test/helpers/i18n.mock';

const appDriver = () => {
  let wrapper;
  return {
    render: () =>
      (wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>,
      )),
    newGame: (p1Name, p2Name) => {
      wrapper
        .find('[data-hook="first-user-input"]')
        .simulate('change', { target: { value: p1Name } });

      wrapper
        .find('[data-hook="second-user-input"]')
        .simulate('change', { target: { value: p2Name } });

      wrapper.find('[data-hook="new-game"]').simulate('click');
    },
    clickACellAt: index =>
      wrapper
        .find('td')
        .at(index)
        .simulate('click'),
    getACellAt: index =>
      wrapper
        .find('td')
        .at(index)
        .text(),
    unmount: () => wrapper.unmount(),
    getWinnerMessage: () => wrapper.find('[data-hook="winner-message"]').text(),
  };
};

describe('App', () => {
  let driver;

  beforeEach(() => (driver = appDriver()));
  afterEach(() => driver.unmount());

  it('renders a title correctly', () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    driver.render();

    driver.newGame(p1Name, p2Name);

    driver.clickACellAt(0);
    driver.clickACellAt(1);

    expect(driver.getACellAt(1)).toBe('O');
  });

  it('second player should win the game', () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    driver.render();

    driver.newGame(p1Name, p2Name);

    driver.clickACellAt(5);
    driver.clickACellAt(0);
    driver.clickACellAt(6);
    driver.clickACellAt(1);
    driver.clickACellAt(8);
    driver.clickACellAt(2);

    expect(driver.getWinnerMessage()).toBe(`${p2Name} won!`);
  });

  it('blocks a clicked cell', () => {
    const p1Name = 'Yaniv';
    const p2Name = 'Computer';

    driver.render();

    driver.newGame(p1Name, p2Name);
    driver.clickACellAt(0);
    driver.clickACellAt(0);
    driver.clickACellAt(1);
    expect(driver.getACellAt(0)).toBe('X');
    expect(driver.getACellAt(1)).toBe('O');
  });

  it('there should be a tie', () => {
    const p1Name = 'drako';
    const p2Name = 'harry';

    driver.render();

    driver.newGame(p1Name, p2Name);

    driver.clickACellAt(0);
    driver.clickACellAt(3);
    driver.clickACellAt(6);
    driver.clickACellAt(2);
    driver.clickACellAt(5);
    driver.clickACellAt(7);
    driver.clickACellAt(1);
    driver.clickACellAt(4);
    driver.clickACellAt(8);

    expect(driver.getWinnerMessage()).toBe(`TIE`);
  });
});
