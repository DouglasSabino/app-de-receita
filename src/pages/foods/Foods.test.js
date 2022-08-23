import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../tests/renderWithRouter';
import Foods from './Foods';
import RecipeProvider from '../../context/RecipeProvider';

describe('Teste a pagina <MainFoodPage />', () => {
  it('Verifica se o header e os botões são renderizados', () => {
    renderWithRouter(
      <RecipeProvider>
        <Foods />
      </RecipeProvider>,
    );

    const profileButton = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
