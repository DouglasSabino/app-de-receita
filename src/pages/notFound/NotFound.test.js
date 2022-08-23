import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../tests/renderWithRouter';
import NotFound from './NotFound';

describe('Testa o componente <NotFound />', () => {
  it('Verifica se é renderizado corretamente', async () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByText(/Not Found/i);

    expect(title).toBeInTheDocument();
  });
});
