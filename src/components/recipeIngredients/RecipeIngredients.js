import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import IngredientListItem from '../ingredient/IngredientListItem';
import './recipeIngredients.css';

function RecipeIngredients({ recipe }) {
  const { setIngredientsProgress, ingredientsProgress } = useContext(RecipeContext);

  useEffect(() => {
    const recipesProgress = localStorage.getItem('inProgressRecipes');
    if (recipesProgress) setIngredientsProgress(JSON.parse(recipesProgress));
  }, []);

  const recipeType = recipe.idMeal ? 'meals' : 'cocktails';
  const recipeId = recipe.idMeal ? recipe.idMeal : recipe.idDrink;

  useEffect(() => {
    const inProgressRecipes = JSON.stringify(ingredientsProgress);
    localStorage.setItem('inProgressRecipes', inProgressRecipes);
  }, [ingredientsProgress]);

  const allKeysOfRecipe = Object.keys(recipe);
  const ingredientKeys = allKeysOfRecipe
    .filter((key) => key.includes('strIngredient') && !!recipe[key]);
  const measureKeys = allKeysOfRecipe
    .filter((key) => key.includes('strMeasure') && !!recipe[key]);
  const measures = measureKeys.map((key) => recipe[key]);
  const ingredients = ingredientKeys.map((key) => recipe[key]);

  const isIngredientChecked = (ingredient) => {
    if (ingredientsProgress[recipeType][recipeId] && (
      ingredientsProgress[recipeType][recipeId].includes(ingredient))) {
      return true;
    } return false;
  };

  const isRecipeDone = () => {
    if (ingredientsProgress[recipeType] && ingredientsProgress[recipeType][recipeId]) {
      const currentRecipe = ingredientsProgress[recipeType][recipeId];
      const isAllIngrdientsChecked = currentRecipe.sort().join(',') === (
        ingredients.sort().join(','));
      return isAllIngrdientsChecked;
    }
  };

  return (
    <div>
      <ul className="recipe-ingredients-list">
        { ingredients.map((ingredient, index) => (
          <IngredientListItem
            ingredient={ ingredient }
            index={ index }
            measure={ measures[index] }
            key={ ingredient }
            recipeId={ recipeId }
            recipeType={ recipeType }
            isIngredientChecked={ isIngredientChecked(ingredient) }
            isRecipeDone={ isRecipeDone }
          />
        ))}
      </ul>
    </div>
  );
}

RecipeIngredients.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecipeIngredients;
