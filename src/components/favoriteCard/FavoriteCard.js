import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import HorizontalShareButton from '../horizontalShareButton/HorizontalShareButton';
import RecipeContext from '../../context/RecipeContext';
import './favoriteCard.css';

function FavoriteCard({ recipe, index }) {
  const { setFavoritedRecipes } = useContext(RecipeContext);
  const { id, name, nationality, category, image, type, alcoholicOrNot } = recipe;

  const removeRecipeFromFavorites = () => {
    setFavoritedRecipes((prevState) => {
      const filteredFavorites = prevState
        .filter((favoritedRecipe) => favoritedRecipe.id !== id);
      return (filteredFavorites);
    });
  };

  return (
    <div className="favorite-card">
      <Link
        to={ type === 'food' ? `/foods/${id}` : `/drinks/${id}` }
        className="favorite-card-image-link"
      >
        <img
          height="200px"
          width="200px"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="food"
          className="favorite-card-image"
        />
      </Link>
      <div className="favorite-card-content">
        <div className="favorite-card-title">
          <Link
            to={ type === 'food' ? `/foods/${id}` : `/drinks/${id}` }
          >
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {name}
            </h1>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {type === 'food' ? `${nationality} - ${category}` : (
              alcoholicOrNot
            ) }
          </p>
        </div>

        <div className="favorite-card-buttons">
          <HorizontalShareButton
            id={ id }
            type={ type }
            index={ index }
          />
          <button
            type="button"
            onClick={ removeRecipeFromFavorites }
            className="remove-favorite-button"
          >
            <img
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="icone de coração para favoritar"
              className="remove-favorite-button-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;
