import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './card.css';

function Card({ item, index, type }) {
  const history = useHistory();

  return (
    <div
      key={ item.idMeal || item.idDrink }
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <button
        type="button"
        onClick={ () => history.push(`/${type}/${item.idMeal || item.idDrink}`) }
        className="recipe-card-button"
      >
        <img
          src={ item.strMealThumb || item.strDrinkThumb }
          alt={ item.strMeal || item.strDrink }
          data-testid={ `${index}-card-img` }
          className="recipe-card-image"
        />
      </button>
      <div className="recipe-card-tile">
        <p data-testid={ `${index}-card-name` }>
          { item.strMeal || item.strDrink }
        </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
}.isRequired;

export default Card;
