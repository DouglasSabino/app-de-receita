import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import getFinishedRecipeObject from '../../helpers/getFinishedRecipeObject';
import './finishRecipeButton.css';

function FinishRecipeButton({ recipe }) {
  const history = useHistory();
  const {
    isCurretRecipeFinished, setFinishedRecipes, finishedRecipes,
  } = useContext(RecipeContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) setFinishedRecipes(JSON.parse(doneRecipes));
  }, []);

  useEffect(() => {
    const doneRecipes = JSON.stringify(finishedRecipes);
    localStorage.setItem('doneRecipes', doneRecipes);
    console.log(finishedRecipes);
  }, [finishedRecipes]);

  useEffect(() => {
    if (redirect) return history.push('/done-recipes');
  }, [redirect]);

  const finishRecipe = () => {
    const recipeObject = getFinishedRecipeObject(recipe);
    if (finishedRecipes.some((r) => r.id === recipeObject.id)) {
      return setRedirect(true);
    }
    setFinishedRecipes((prevState) => ([...prevState, recipeObject]));
    setRedirect(true);
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ finishRecipe }
      disabled={ !isCurretRecipeFinished }
      className="finish-recipe-button"
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FinishRecipeButton;
