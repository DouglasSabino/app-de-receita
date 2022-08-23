import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeIngredients from '../../components/recipeIngredients/RecipeIngredients';
import FavoriteButton from '../../components/favoriteButton/FavoriteButton';
import ShareButton from '../../components/shareButton/ShareButton';
import FinishRecipeButton from '../../components/finishRecipeButton/FinishRecipeButton';
import '../foodInProgress.css';

function FoodInProgress(props) {
  const [meal, setMeal] = useState({});
  const { match: { params: { id } } } = props;
  useEffect(() => {
    const getRecipeInProgress = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      const recipeInProgress = data.meals[0];
      setMeal(recipeInProgress);
    };
    getRecipeInProgress();
  }, []);

  const { strCategory, strMeal, strInstructions, strMealThumb } = meal;

  return (
    <div className="recipe-main">
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        className="recipe-image"
      />
      <div className="recipe-header">
        <div className="recipe-header-title">
          <h1 data-testid="recipe-title">
            { strMeal }
          </h1>
          <p data-testid="recipe-category">
            { strCategory }
          </p>
        </div>
        <div className="recipe-header-buttons">
          <ShareButton />
          <FavoriteButton recipe={ meal } />
        </div>
      </div>
      <RecipeIngredients recipe={ meal } />
      <div className="recipe-instructions">
        <p data-testid="instructions">
          { strInstructions }
        </p>
      </div>
      <div className="recipe-finish">
        <FinishRecipeButton recipe={ meal } />
      </div>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodInProgress;
