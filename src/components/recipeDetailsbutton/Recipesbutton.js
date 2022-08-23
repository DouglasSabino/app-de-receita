import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './recipesButton.css';

function RecipeButton({ recipe }) {
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [progressRecipe, setProgressRecipe] = useState('Start Recipe');
  const history = useHistory();

  let recipeId;
  let recipeType;
  if (recipe.idMeal) {
    recipeId = recipe.idMeal;
    recipeType = 'foods';
  } if (recipe.idDrink) {
    recipeId = recipe.idDrink;
    recipeType = 'drinks';
  }

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', '[]');
    }
  }, []);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes.some((finishedRecipe) => finishedRecipe.id === recipeId)) {
      setDoneRecipe(true);
    }
  });

  useEffect(() => {
    const inProgress = () => {
      const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (progressRecipes && progressRecipes.cocktails) {
        setProgressRecipe('Continue Recipe');
      }
      if (progressRecipes && progressRecipes.meals) {
        setProgressRecipe('Continue Recipe');
      }
    };
    inProgress();
  });

  return (
    <div className="recipe-button-div">
      {
        doneRecipe ? '' : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="recipe-button"
            onClick={ () => history
              .push(`/${recipeType}/${recipeId}/in-progress`) }
          >
            { progressRecipe }

          </button>
        )
      }
    </div>
  );
}

RecipeButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecipeButton;
