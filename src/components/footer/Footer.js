import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footerBar">

      <button
        type="button"
        onClick={ () => history.push('/drinks') }
        className="footer-button"
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ () => history.push('/explore') }
        className="footer-button"
      >
        <img
          src={ exploreIcon }
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ () => history.push('/foods') }
        className="footer-button"
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="food-bottom-btn"
        />
      </button>

    </footer>
  );
}

export default Footer;
