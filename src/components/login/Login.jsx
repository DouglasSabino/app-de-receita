import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import hat from './hatImg.png';

const passwordMin = 6;

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    && password.length > passwordMin) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  function handleClick() {
    const obj = {
      email,
    };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/foods');
  }

  return (
    <div className="LoginContainer">
      <img
        src={ hat }
        alt="hatImage"
        className="hatImg"
      />
      <h1> Smart Food </h1>
      <div className="InputsContainer">
        <h4 className="loginH4">Login:</h4>
        <section className="inputsSection">
          <div className="inputs">
            <input
              name="email"
              value={ email }
              data-testid="email-input"
              type="email"
              placeholder="Email"
              onChange={ ({ target }) => setEmail(target.value) }
            />
            <input
              name="password"
              value={ password }
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>
          <button
            type="button"
            className="buttonLogin"
            data-testid="login-submit-btn"
            disabled={ disabled }
            onClick={ handleClick }
          >
            Enter
          </button>
        </section>
      </div>
    </div>
  );
}

export default Login;
