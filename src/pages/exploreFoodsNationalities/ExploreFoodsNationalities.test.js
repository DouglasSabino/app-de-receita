import React from 'react';
import { screen } from '@testing-library/react';
import RecipeProvider from '../../context/RecipeProvider';
import renderWithRouter from '../../tests/renderWithRouter';
import ExploreFoodsNationalities from './ExploreFoodsNationalities';

describe('Testa o componente <ExploreFoodsNationalities />', () => {
  it('Verifica se é renderizado corretamente', async () => {
    renderWithRouter(
      <RecipeProvider>
        <ExploreFoodsNationalities />
      </RecipeProvider>,
    );

    const profileTopBrn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const exploreByNationality = screen.getByTestId('explore-by-nationality-dropdown');
    const americanOption = await screen.findByTestId('American-option');
    const firstCard = await screen.findByTestId('0-card-img');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBottomBtn = screen.getByTestId('explore-bottom-btn');
    const foodBottomBtn = screen.getByTestId('food-bottom-btn');

    expect(profileTopBrn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(exploreByNationality).toBeInTheDocument();
    expect(americanOption).toBeInTheDocument();
    expect(firstCard).toBeInTheDocument();
    expect(drinksBottomBtn).toBeInTheDocument();
    expect(exploreBottomBtn).toBeInTheDocument();
    expect(foodBottomBtn).toBeInTheDocument();
  });
});
