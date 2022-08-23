import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import Header from './Header';
import RecipeProvider from '../../context/RecipeProvider';

describe('Testa o componente <Header />', () => {
  const PROFILE_TOP_BTN = 'profile-top-btn';
  const SEARCH_TOP_BTN = 'search-top-btn';
  it('Verifica se os elementos corretos são renderizados com o botão de busca', () => {
    renderWithRouter(<Header title="Foods" hasSearch />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId('page-title');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica se o Header não renderiza o botão de busca', () => {
    renderWithRouter(<Header title="Foods" />);

    const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId('page-title');
    const searchBtn = screen.queryByTestId(SEARCH_TOP_BTN);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Perfil a página é redirecionada para /profile',
    () => {
      const { history } = renderWithRouter(<Header title="Foods" />);

      const profileBtn = screen.getByTestId(PROFILE_TOP_BTN);
      userEvent.click(profileBtn);

      expect(history.location.pathname).toBe('/profile');
    });

  it('Verifica funcionamento do botão search', () => {
    renderWithRouter(
      <RecipeProvider>
        <Header title="Foods" hasSearch />
      </RecipeProvider>,
    );

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
  });
});
