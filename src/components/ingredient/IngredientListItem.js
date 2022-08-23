import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import './ingredientListItem.css';

function IngredientListItem(props) {
  const {
    ingredient,
    measure,
    index,
    recipeId,
    recipeType,
    isIngredientChecked,
    isRecipeDone,
  } = props;

  const {
    setIngredientsProgress,
    ingredientsProgress,
    setIsCurretRecipeFinished } = useContext(RecipeContext);
  const [ingredientDone, setIngredientDone] = useState(isIngredientChecked);

  useEffect(() => {
    setIsCurretRecipeFinished(isRecipeDone());
  }, [ingredientDone]);

  useEffect(() => {
    if (ingredientsProgress[recipeType][recipeId] && (
      ingredientsProgress[recipeType][recipeId].includes(ingredient))) {
      setIngredientDone(true);
    }
  }, []);

  const updateProgress = (ingredientName, ingredientIsChecked, recipeCategory) => {
    if (ingredientIsChecked) {
      setIngredientsProgress((prevState) => {
        const recipe = prevState[recipeCategory];
        const progressArray = recipe[recipeId] ? recipe[recipeId] : [];
        return {
          ...prevState,
          [recipeCategory]: {
            ...recipe,
            [recipeId]: [...progressArray, ingredientName],
          },
        };
      });
    } else {
      setIngredientsProgress((prevState) => {
        const recipe = prevState[recipeCategory];
        const progressArray = recipe[recipeId] ? recipe[recipeId] : [];
        const filteredProgress = progressArray
          .filter((ingredients) => ingredients !== ingredientName);
        return {
          ...prevState,
          [recipeCategory]: {
            ...recipe,
            [recipeId]: [...filteredProgress],
          },
        };
      });
    }
  };

  const handleIngredientCheckbox = (event) => {
    const { target: { name, checked } } = event;
    setIngredientDone(!ingredientDone);
    updateProgress(name, checked, recipeType);
  };

  return (
    <li
      key={ ingredient }
      data-testid={ `${index}-ingredient-step` }
      className={ ingredientDone ? (
        'ingredient-list-item-done'
      ) : 'ingredient-list-item' }
    >
      <input
        type="checkbox"
        name={ ingredient }
        checked={ ingredientDone }
        onChange={ (event) => handleIngredientCheckbox(event) }
      />
      {`${ingredient} - ${measure}`}
    </li>
  );
}

IngredientListItem.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  isIngredientChecked: PropTypes.bool.isRequired,
  isRecipeDone: PropTypes.func.isRequired,
};

export default IngredientListItem;
