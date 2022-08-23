import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeProvider from '../../context/RecipeProvider';
import renderWithRouter from '../../tests/renderWithRouter';
import Nationalities from './Nationalities';

describe('Testa o componente <Nationalities />', () => {
  const EXPLORE_BY_NATIONALITY_DROPDOWN = 'explore-by-nationality-dropdown';
  const AMERICAN_OPTION = 'American-option';

  it('Verifica se o select e os options são renderizados', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [
          { strArea: 'American' },
          { strArea: 'British' },
          { strArea: 'Canadian' },
        ],
      }),
    });

    renderWithRouter(
      <RecipeProvider>
        <Nationalities />
      </RecipeProvider>,
    );

    const exploreByNationality = screen.getByTestId(EXPLORE_BY_NATIONALITY_DROPDOWN);
    const allOption = screen.getByTestId('All-option');
    const americanOption = await screen.findByTestId(AMERICAN_OPTION);
    const britishOption = await screen.findByTestId('British-option');
    const canadianOption = await screen.findByTestId('Canadian-option');

    expect(exploreByNationality).toBeInTheDocument();
    expect(allOption).toBeInTheDocument();
    expect(americanOption).toBeInTheDocument();
    expect(britishOption).toBeInTheDocument();
    expect(canadianOption).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  it('Verifica se ao selecionar uma nacionalidade são removidos cards', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [
          { strArea: 'American' },
          { strArea: 'British' },
          { strArea: 'Canadian' },
        ],
      }),
    });

    renderWithRouter(
      <RecipeProvider>
        <Nationalities />
      </RecipeProvider>,
    );

    const exploreByNationality = screen.getByTestId(EXPLORE_BY_NATIONALITY_DROPDOWN);
    const americanOption = await screen.findByTestId(AMERICAN_OPTION);

    expect(exploreByNationality).toBeInTheDocument();
    expect(americanOption).toBeInTheDocument();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52855',
          strMeal: 'Banana Pancakes',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
        },
        {
          idMeal: '52995',
          strMeal: 'BBQ Pork Sloppy Joes',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg',
        }],
      }),
    });

    userEvent
      .selectOptions(screen.getByTestId(EXPLORE_BY_NATIONALITY_DROPDOWN), ['American']);

    await waitForElement(() => screen.queryByTestId(AMERICAN_OPTION));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    global.fetch.mockRestore();
  });

  it('Verifica o select all', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [
          { strArea: 'American' },
          { strArea: 'British' },
          { strArea: 'Canadian' },
        ],
      }),
    });

    renderWithRouter(
      <RecipeProvider>
        <Nationalities />
      </RecipeProvider>,
    );

    const exploreByNationality = screen.getByTestId(EXPLORE_BY_NATIONALITY_DROPDOWN);
    const all = screen.getByText('All');
    const americanOption = await screen.findByTestId(AMERICAN_OPTION);

    expect(all).toBeInTheDocument();
    expect(exploreByNationality).toBeInTheDocument();
    expect(americanOption).toBeInTheDocument();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [{
          idMeal: '52855',
          strMeal: 'Banana Pancakes',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
        },
        {
          idMeal: '52995',
          strMeal: 'BBQ Pork Sloppy Joes',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg',
        }],
      }),
    });

    userEvent
      .selectOptions(screen.getByTestId(EXPLORE_BY_NATIONALITY_DROPDOWN), ['all']);

    await waitForElement(() => screen.queryByTestId(AMERICAN_OPTION));

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
