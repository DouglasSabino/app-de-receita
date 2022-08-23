import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../tests/renderWithRouter';
import ExploreFoods from './ExploreFoods';

describe('Testa o componente <ExploreButtons />', () => {
  it('Verifica se os botões são renderizados na foods', () => {
    renderWithRouter(<ExploreFoods />);

    const profileTopBrn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    const exploreByNationality = screen.getByTestId('explore-by-nationality');
    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBottomBtn = screen.getByTestId('explore-bottom-btn');
    const foodBottomBtn = screen.getByTestId('food-bottom-btn');

    expect(profileTopBrn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(exploreByIngredientBtn).toBeInTheDocument();
    expect(exploreByNationality).toBeInTheDocument();
    expect(exploreSurpriseBtn).toBeInTheDocument();
    expect(drinksBottomBtn).toBeInTheDocument();
    expect(exploreBottomBtn).toBeInTheDocument();
    expect(foodBottomBtn).toBeInTheDocument();
  });
});
