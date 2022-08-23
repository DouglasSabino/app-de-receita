import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import ExploreButtons from './ExploreButtons';

describe('Testa o componente <ExploreButtons />', () => {
  const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
  const EXPLORE_SURPRISE = 'explore-surprise';

  it('Verifica se os botões são renderizados na foods', () => {
    renderWithRouter(<ExploreButtons type="foods" />);

    const NUMBER_OF_BUTTONS = 3;

    const allButtons = screen.getAllByRole('button');
    const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT);
    const exploreByNationalityBtn = screen.getByTestId('explore-by-nationality');
    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE);

    expect(exploreByIngredientBtn).toBeInTheDocument();
    expect(exploreByNationalityBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toBeInTheDocument();
    expect(allButtons).toHaveLength(NUMBER_OF_BUTTONS);
  });

  it('Verifica se os botões são renderizados na drinks', () => {
    renderWithRouter(<ExploreButtons type="drinks" />);

    const NUMBER_OF_BUTTONS = 2;

    const allButtons = screen.getAllByRole('button');
    const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT);
    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE);

    expect(exploreByIngredientBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toBeInTheDocument();
    expect(allButtons).toHaveLength(NUMBER_OF_BUTTONS);
  });

  it('Verifica se ao clicar no botão de ingredientes é redirecionada na foods', () => {
    const { history } = renderWithRouter(<ExploreButtons type="foods" />);

    const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT);

    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('Verifica se ao clicar no botão de ingredientes é redirecionada na drinks', () => {
    const { history } = renderWithRouter(<ExploreButtons type="drinks" />);

    const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT);

    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it('Verifica se ao clicar no botão de nacionalidades a página é redirecionada', () => {
    const { history } = renderWithRouter(<ExploreButtons type="foods" />);

    const exploreByNationalityBtn = screen.getByTestId('explore-by-nationality');

    userEvent.click(exploreByNationalityBtn);

    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('Verifica se ao clicar no botão Surprise me! é redirecionada na foods', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52854',
        }],
      }),
    });

    const { history } = renderWithRouter(<ExploreButtons type="foods" />);

    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE);

    userEvent.click(exploreSurpriseBtn);

    await waitForElement(() => screen.queryByTestId(EXPLORE_SURPRISE));

    expect(history.location.pathname).toBe('/foods/52854');
    global.fetch.mockRestore();
  });

  it('Verifica se ao clicar no botão Surprise me é redirecionada na drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [{
          idDrink: '17246',
        }],
      }),
    });

    const { history } = renderWithRouter(<ExploreButtons type="drinks" />);

    const exploreSurpriseBtn = screen.getByTestId(EXPLORE_SURPRISE);

    userEvent.click(exploreSurpriseBtn);

    await waitForElement(() => screen.queryByTestId(EXPLORE_SURPRISE));

    expect(history.location.pathname).toBe('/drinks/17246');
  });
});
