import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../tests/renderWithRouter';
import Login from './Login';

describe('Teste o componente <App.js />', () => {
  const LOGIN = 'login-submit-btn';
  const EMAIL = 'email-input';
  const PASSWORD = 'password-input';
  it('Teste se o possui input do tipo email', () => {
    renderWithRouter(<Login />);

    const email = screen.getByTestId(EMAIL);
    expect(email).toBeInTheDocument();
  });
  it('Teste se o possui input do tipo password', () => {
    renderWithRouter(<Login />);

    const password = screen.getByTestId(PASSWORD);
    expect(password).toBeInTheDocument();
  });
  it('Teste se o possui um botão', () => {
    renderWithRouter(<Login />);

    const button = screen.getByTestId(LOGIN);
    expect(button).toBeInTheDocument();
  });
  it('teste se o botão está desabilitado', () => {
    renderWithRouter(<Login />);

    const buttonDisabled = screen.getByTestId(LOGIN);
    expect(buttonDisabled).toBeDisabled();
  });
  it('teste se o botão é habilitado ao digitar o email e senha corretamente', () => {
    renderWithRouter(<Login />);

    const email = screen.getByTestId(EMAIL);
    const password = screen.getByTestId(PASSWORD);
    const button = screen.getByTestId(LOGIN);

    userEvent.type(email, 'guest@hotmail.com');
    userEvent.type(password, '123456779');
    expect(button).not.toBeDisabled();
  });
  it('teste se o botão continua desabilitado ao escrever email e senha errados', () => {
    renderWithRouter(<Login />);

    const email = screen.getByTestId(EMAIL);
    const password = screen.getByTestId(PASSWORD);
    const button = screen.getByTestId(LOGIN);

    userEvent.type(email, 'guest');
    userEvent.type(password, '1239');
    expect(button).toBeDisabled();
  });
  it('Verifica se ao clicar no botão enter, é direcionado para a página /foods', () => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL);
    const password = screen.getByTestId(PASSWORD);
    const button = screen.getByTestId(LOGIN);

    userEvent.type(email, 'guest@hotmail.com');
    userEvent.type(password, '123456779');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/foods');
  });
});
