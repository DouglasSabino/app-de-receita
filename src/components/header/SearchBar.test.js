import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import SearchBar from './SearchBar';
import RecipeProvider from '../../context/RecipeProvider';

describe('Testa o componente <SearchBar />', () => {
  const SEARCH_INPUT = 'search-input';
  const EXEC_SEARCH_BTN = 'exec-search-btn';
  const NAME_SEARCH_RADIO = 'name-search-radio';

  it('Verifica se o botão faz um fetch quando é clicado na tela Foods', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52977',
          strMeal: 'Corba',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        },
        {
          idMeal: '52804',
          strMeal: 'Poutine',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
        }],
      }),
    });

    renderWithRouter(
      <RecipeProvider>
        <SearchBar searchType="Foods" />
      </RecipeProvider>,
    );

    const searchInput = screen.queryByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.queryByTestId(NAME_SEARCH_RADIO);
    const execSearchBtn = screen.queryByTestId(EXEC_SEARCH_BTN);

    userEvent.type(searchInput, 'potato');
    userEvent.click(nameSearchRadio);
    userEvent.click(execSearchBtn);

    await waitForElement(() => screen.queryByTestId(SEARCH_INPUT));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=potato');
    global.fetch.mockRestore();
  });

  it('Verifica se o botão faz um fetch quando é clicado na tela Drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [] }),
    });

    renderWithRouter(
      <RecipeProvider>
        <SearchBar searchType="Drinks" />
      </RecipeProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(searchInput, 'lemon');
    userEvent.click(nameSearchRadio);
    userEvent.click(ingredientSearchRadio);
    userEvent.click(execSearchBtn);

    await waitForElement(() => screen.queryByTestId(SEARCH_INPUT));

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
    global.fetch.mockRestore();
  });

  it('Ao selecionar first letter e buscar com mais de uma letra exibe alert na foods',
    () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation();
      renderWithRouter(
        <RecipeProvider>
          <SearchBar searchType="Foods" />
        </RecipeProvider>,
      );

      const searchInput = screen.getByTestId(SEARCH_INPUT);
      const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
      const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

      userEvent.type(searchInput, 'banana');
      userEvent.click(firstLetterSearchRadio);
      userEvent.click(execSearchBtn);

      expect(alertMock)
        .toHaveBeenCalledTimes(1);
      expect(alertMock)
        .toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });

  it('Verifica se faz um alerta ao pesquisar um nome inexistente', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    renderWithRouter(
      <RecipeProvider>
        <SearchBar searchType="Drinks" />
      </RecipeProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.queryByTestId(NAME_SEARCH_RADIO);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(searchInput, 'afsadfsdfs');
    userEvent.click(nameSearchRadio);
    userEvent.click(execSearchBtn);

    await waitForElement(() => screen.queryByTestId(SEARCH_INPUT));

    expect(alertMock)
      .toHaveBeenCalledTimes(1);
    expect(alertMock)
      .toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    global.fetch.mockRestore();
  });

  it('Verifica se faz um alerta ao pesquisar um ingrediente inexistente', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(undefined),
    });

    renderWithRouter(
      <RecipeProvider>
        <SearchBar searchType="Drinks" />
      </RecipeProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(searchInput, 'afsadfsdfs');
    userEvent.click(ingredientSearchRadio);
    userEvent.click(execSearchBtn);

    await waitForElement(() => screen.queryByTestId(SEARCH_INPUT));

    expect(alertMock)
      .toHaveBeenCalledTimes(1);
    expect(alertMock)
      .toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    global.fetch.mockRestore();
  });

  it('Verifica se quando tiver um resultado redireciona na drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [{
          idDrink: '13501',
          strDrink: 'ABC',
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
        }],
      }),
    });

    const { history } = renderWithRouter(
      <RecipeProvider>
        <SearchBar searchType="Drinks" />
      </RecipeProvider>,
    );

    const searchInput = screen.queryByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.queryByTestId(NAME_SEARCH_RADIO);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    expect(searchInput).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.type(searchInput, 'ABC');
    userEvent.click(nameSearchRadio);
    userEvent.click(execSearchBtn);

    await waitForElement(() => screen.queryByTestId(SEARCH_INPUT));

    expect(history.location.pathname).toBe('/drinks/13501');
    global.fetch.mockRestore();
  });

  it('Verifica se quando tiver um resultado redireciona na foods', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52804',
          strMeal: 'Poutine',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
        }],
      }),
    });

    const { history } = renderWithRouter(
      <RecipeProvider>
        <SearchBar searchType="Foods" />
      </RecipeProvider>,
    );

    const searchInput = screen.queryByTestId(SEARCH_INPUT);
    const nameSearchRadio = screen.queryByTestId(NAME_SEARCH_RADIO);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    expect(searchInput).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();

    userEvent.type(searchInput, 'Poutine');
    userEvent.click(nameSearchRadio);
    userEvent.click(execSearchBtn);

    await waitForElement(() => screen.queryByTestId(SEARCH_INPUT));

    expect(history.location.pathname).toBe('/foods/52804');
  });
});
