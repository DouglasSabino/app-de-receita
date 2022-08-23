import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeIngredients from '../../components/recipeIngredients/RecipeIngredients';
import FavoriteButton from '../../components/favoriteButton/FavoriteButton';
import ShareButton from '../../components/shareButton/ShareButton';
import FinishRecipeButton from '../../components/finishRecipeButton/FinishRecipeButton';
import '../foodInProgress.css';

function DrinkInProgress(props) {
  const [drink, setDrink] = useState({});
  const { match: { params: { id } } } = props;
  useEffect(() => {
    const getRecipeInProgress = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      const recipeInProgress = data.drinks[0];
      setDrink(recipeInProgress);
    };
    getRecipeInProgress();
  }, []);

  const { strCategory, strDrink, strInstructions, strDrinkThumb } = drink;

  return (
    <div className="recipe-main">
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
        className="recipe-image"
      />
      <div className="recipe-header">
        <div className="recipe-header-title">
          <h1 data-testid="recipe-title">
            { strDrink }
          </h1>
          <p data-testid="recipe-category">
            { strCategory }
          </p>
        </div>
        <div className="recipe-header-buttons">
          <ShareButton />
          <FavoriteButton recipe={ drink } />
        </div>
      </div>
      <RecipeIngredients recipe={ drink } />
      <div className="recipe-instructions">
        <p data-testid="instructions">
          { strInstructions }
        </p>
      </div>
      <div className="recipe-finish">
        <FinishRecipeButton recipe={ drink } />
      </div>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkInProgress;
