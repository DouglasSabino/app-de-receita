import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import Explore from './Explore';

describe('Testa o componente <Footer />', () => {
  const DATATEST_EXPLORE_FOOD = 'explore-foods';
  const DATATEST_EXPLORE_DRINKS = 'explore-drinks';

  it('Verifica os elementos da tela explorar', () => {
    renderWithRouter(<Explore title="Explore" />);

    const foodExplorerBtn = screen.getByTestId(DATATEST_EXPLORE_FOOD);
    const drinkExploreBtn = screen.getByTestId(DATATEST_EXPLORE_DRINKS);

    expect(foodExplorerBtn).toBeInTheDocument();
    expect(drinkExploreBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão "Explore Foods" será'
  + ' redirecionado para a página correta', () => {
    const { history } = renderWithRouter(<Explore title="Explore" />);

    const foodExplorerBtn = screen.getByTestId(DATATEST_EXPLORE_FOOD);
    userEvent.click(foodExplorerBtn);

    expect(history.location.pathname).toBe('/explore/foods');
  });

  it('Verifica se ao clicar no botão "Explore Drinks" será'
  + ' redirecionado para a página correta', () => {
    const { history } = renderWithRouter(<Explore title="Explore" />);

    const drinkExploreBtn = screen.getByTestId(DATATEST_EXPLORE_DRINKS);
    userEvent.click(drinkExploreBtn);

    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
