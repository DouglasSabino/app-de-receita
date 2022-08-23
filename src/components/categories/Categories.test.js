import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import Categories from './Categories';
import RecipeProvider from '../../context/RecipeProvider';
import Foods from '../../pages/foods/Foods';
import Drinks from '../../pages/drinks/Drinks';

describe('Testa o componente <Categories />', () => {
  const STR_DRINK_A_PIECE_OF_ASS = 'A Piece of Ass';
  const STR_MEAL_CHICKEN = 'Chicken Handi';
  it('Verifica se as categorias são renderizadas', async () => {
    renderWithRouter(
      <RecipeProvider>
        <Categories type="food" />
      </RecipeProvider>,
    );

    const allCategoryFilter = screen.getByTestId('All-category-filter');
    const beefCategoryFilter = await screen.findByTestId('Beef-category-filter');
    const breakfastCategoryFilter = await screen
      .findByTestId('Breakfast-category-filter');
    const chickenCategoryFilter = await screen.findByTestId('Chicken-category-filter');
    const dessertCategoryFilter = await screen.findByTestId('Dessert-category-filter');
    const goatCategoryFilter = await screen.findByTestId('Goat-category-filter');

    expect(allCategoryFilter).toBeInTheDocument();
    expect(beefCategoryFilter).toBeInTheDocument();
    expect(breakfastCategoryFilter).toBeInTheDocument();
    expect(chickenCategoryFilter).toBeInTheDocument();
    expect(dessertCategoryFilter).toBeInTheDocument();
    expect(goatCategoryFilter).toBeInTheDocument();
  });

  it('Verifica se ao clicar na categoria os cards são removidos', async () => {
    jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(
      <RecipeProvider>
        <Foods />
      </RecipeProvider>,
    );

    const dessetCategoryFilter = await screen.findByTestId('Dessert-category-filter');
    const corbaElement = await screen.findByText(/Corba/i);

    expect(dessetCategoryFilter).toBeInTheDocument();
    expect(corbaElement).toBeInTheDocument();

    userEvent.click(dessetCategoryFilter);

    await waitForElementToBeRemoved(() => screen.queryByText(/Corba/i));

    expect(corbaElement).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar na categoria os cards são filtrados na drinks', async () => {
    jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouter(
      <RecipeProvider>
        <Drinks />
      </RecipeProvider>,
    );

    const otherCategoryFilter = await screen
      .findByTestId('Other/Unknown-category-filter');
    const drinkElement = await screen.findByText('ACID');

    expect(otherCategoryFilter).toBeInTheDocument();
    expect(drinkElement).toBeInTheDocument();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [{
          idDrink: '16405',
          strDrink: STR_DRINK_A_PIECE_OF_ASS,
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqxyxx1472719737.jpg',
        }],
      }),
    });

    userEvent.click(otherCategoryFilter);
    await waitForElementToBeRemoved(() => screen.queryByText('ACID'));
    const otherDrinkElement = await screen.findByText(STR_DRINK_A_PIECE_OF_ASS);

    expect(drinkElement).not.toBeInTheDocument();
    expect(otherDrinkElement).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  it('Verifica se ao clicar na categoria all os cards são filtrados', async () => {
    jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouter(
      <RecipeProvider>
        <Drinks />
      </RecipeProvider>,
    );

    const allCategoryFilter = screen.getByTestId('All-category-filter');
    const otherCategoryFilter = await screen
      .findByTestId('Other/Unknown-category-filter');
    const drinkElement = await screen.findByText('ACID');

    expect(otherCategoryFilter).toBeInTheDocument();
    expect(drinkElement).toBeInTheDocument();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [{
          idDrink: '16405',
          strDrink: STR_DRINK_A_PIECE_OF_ASS,
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqxyxx1472719737.jpg',
        }],
      }),
    });

    userEvent.click(otherCategoryFilter);

    await waitForElementToBeRemoved(() => screen.queryByText('ACID'));
    const otherDrinkElement = await screen.findByText(STR_DRINK_A_PIECE_OF_ASS);

    expect(drinkElement).not.toBeInTheDocument();
    expect(otherDrinkElement).toBeInTheDocument();

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [{
          idDrink: '13501',
          strDrink: 'ABC',
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
        }],
      }),
    });

    userEvent.click(allCategoryFilter);

    await waitForElementToBeRemoved(() => screen.queryByText(STR_DRINK_A_PIECE_OF_ASS));

    const abcDrink = await screen.findByText('ABC');

    expect(otherDrinkElement).not.toBeInTheDocument();
    expect(abcDrink).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  it('Verifica se ao clicar em um filtro denovo ele é desativado', async () => {
    jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouter(
      <RecipeProvider>
        <Foods />
      </RecipeProvider>,
    );

    const chickenCategoryFilter = await screen.findByTestId('Chicken-category-filter');
    const kumpirMeal = await screen.findByText('Kumpir');

    expect(chickenCategoryFilter).toBeInTheDocument();
    expect(kumpirMeal).toBeInTheDocument();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52795',
          strMeal: STR_MEAL_CHICKEN,
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
        }],
      }),
    });

    userEvent.click(chickenCategoryFilter);

    await waitForElementToBeRemoved(() => screen.queryByText('Kumpir'));

    const chickenHandi = await screen.findByText(STR_MEAL_CHICKEN);

    expect(kumpirMeal).not.toBeInTheDocument();
    expect(chickenHandi).toBeInTheDocument();

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52978',
          strMeal: 'Kumpir',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
        }],
      }),
    });

    userEvent.click(chickenCategoryFilter);

    await waitForElementToBeRemoved(() => screen.queryByText(STR_MEAL_CHICKEN));

    const kumpirMealSecond = await screen.findByText('Kumpir');

    expect(chickenHandi).not.toBeInTheDocument();
    expect(kumpirMealSecond).toBeInTheDocument();
  });
});
