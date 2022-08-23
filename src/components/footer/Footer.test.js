import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import Footer from './Footer';

describe('Testa o componente <Footer />', () => {
  const ATRIBUTE_FOOTER = 'footer';
  const DRINKS_BOTTON_BTN = 'drinks-bottom-btn';
  const EXPLORE_BOTTON_BTN = 'explore-bottom-btn';
  const FOOD_BOTTON_BTN = 'food-bottom-btn';

  it('Verifica os elementos do menu inferior respeitando os'
  + 'atributos descritos no protótipo', () => {
    renderWithRouter(<Footer title="Foods" />);

    const artibuteFooter = screen.getByTestId(ATRIBUTE_FOOTER);
    const drinksbottonBtn = screen.getByTestId(DRINKS_BOTTON_BTN);
    const exploreBottonBtn = screen.getByTestId(EXPLORE_BOTTON_BTN);
    const foodBottonBtn = screen.getByTestId(FOOD_BOTTON_BTN);

    expect(artibuteFooter).toBeInTheDocument();
    expect(drinksbottonBtn).toBeInTheDocument();
    expect(exploreBottonBtn).toBeInTheDocument();
    expect(foodBottonBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Drinks a página é redirecionada para /drinks',
    () => {
      const { history } = renderWithRouter(<Footer title="Foods" />);

      const drinksbottonBtn = screen.getByTestId(DRINKS_BOTTON_BTN);
      userEvent.click(drinksbottonBtn);

      expect(history.location.pathname).toBe('/drinks');
    });

  it('Verifica se ao clicar no botão Explore a página é redirecionada para /explore',
    () => {
      const { history } = renderWithRouter(<Footer title="Foods" />);

      const exploreBottonBtn = screen.getByTestId(EXPLORE_BOTTON_BTN);
      userEvent.click(exploreBottonBtn);

      expect(history.location.pathname).toBe('/explore');
    });

  it('Verifica se ao clicar no botão Food a página é redirecionada para /foods',
    () => {
      const { history } = renderWithRouter(<Footer title="Foods" />);

      const foodBottonBtn = screen.getByTestId(FOOD_BOTTON_BTN);
      userEvent.click(foodBottonBtn);

      expect(history.location.pathname).toBe('/foods');
    });
});
