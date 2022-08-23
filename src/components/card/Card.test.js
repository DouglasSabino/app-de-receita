import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import Card from './Card';

describe('Testa o componente <Card />', () => {
  const CARD_IMG0 = '0-card-img';
  it('Verifica se o card é renderizado corretamente na página foods', () => {
    const meal = {
      idMeal: '52977',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      strMeal: 'Corba',
    };

    renderWithRouter(<Card item={ meal } index={ 0 } type="foods" />);

    const recipeCard = screen.getByTestId('0-recipe-card');
    const cardImg = screen.getByTestId(CARD_IMG0);
    const cardName = screen.getByTestId('0-card-name');

    expect(recipeCard).toBeInTheDocument();
    expect(cardImg).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });

  it('Verifica se o card é renderizado corretamente na página drinks', () => {
    const drink = {
      idDrink: '15997',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strDrink: 'GG',
    };

    renderWithRouter(<Card item={ drink } index={ 0 } type="drinks" />);

    const recipeCard = screen.getByTestId('0-recipe-card');
    const cardImg = screen.getByTestId(CARD_IMG0);
    const cardName = screen.getByTestId('0-card-name');

    expect(recipeCard).toBeInTheDocument();
    expect(cardImg).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });

  it('Verifica a rota é redirecionada ao clicar no card da página foods', () => {
    const meal = {
      idMeal: '52977',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      strMeal: 'Corba',
    };

    const { history } = renderWithRouter(<Card item={ meal } index={ 0 } type="foods" />);

    const cardImg = screen.getByTestId(CARD_IMG0);

    userEvent.click(cardImg);

    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('Verifica a rota é redirecionada ao clicar no card da página drinks', () => {
    const drink = {
      idDrink: '15997',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strDrink: 'GG',
    };

    const { history } = renderWithRouter(
      <Card item={ drink } index={ 0 } type="drinks" />,
    );

    const cardImg = screen.getByTestId(CARD_IMG0);

    userEvent.click(cardImg);

    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
