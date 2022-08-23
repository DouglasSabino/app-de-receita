import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../tests/renderWithRouter';
import ExploreDrinks from './ExploreDrinks';

describe('Testa o componente <ExploreButtons />', () => {
  it('Verifica se os botões são renderizados na foods', () => {
    renderWithRouter(<ExploreDrinks />);

    const profileTopBrn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBottomBtn = screen.getByTestId('explore-bottom-btn');
    const foodBottomBtn = screen.getByTestId('food-bottom-btn');

    expect(profileTopBrn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(exploreByIngredientBtn).toBeInTheDocument();
    expect(exploreSurpriseBtn).toBeInTheDocument();
    expect(drinksBottomBtn).toBeInTheDocument();
    expect(exploreBottomBtn).toBeInTheDocument();
    expect(foodBottomBtn).toBeInTheDocument();
  });
});
