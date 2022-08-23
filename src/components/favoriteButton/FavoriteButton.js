import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import RecipeContext from '../../context/RecipeContext';
import getFavoriteObject from '../../helpers/getFavoriteObject';
import './favoriteButton.css';

function FavoriteButton({ recipe }) {
  const { setFavoritedRecipes, favoritedRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) setFavoritedRecipes(favoriteRecipes);
    else setFavoritedRecipes([]);
  }, []);

  const recipeId = recipe.idDrink ? recipe.idDrink : recipe.idMeal;
  const recipeIsFavorited = favoritedRecipes
    .some((favoritedRecipe) => (
      favoritedRecipe.id === recipeId
    ));

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedRecipes));
  }, [favoritedRecipes]);

  const setFavoriteRecipe = () => {
    const favoriteRecipeObj = getFavoriteObject(recipe);
    if (!recipeIsFavorited) {
      return setFavoritedRecipes((prevState) => (
        [...prevState, favoriteRecipeObj]
      ));
    }
    return setFavoritedRecipes((prevState) => {
      const filteredFavorites = prevState
        .filter((favoritedRecipe) => favoritedRecipe.id !== recipeId);
      return (filteredFavorites);
    });
  };

  return (
    <button
      type="button"
      onClick={ setFavoriteRecipe }
      className="favorite-button"
    >
      <img
        src={ recipeIsFavorited ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt="icone de coração para favoritar"
        className="favorite-button-icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteButton;
