import React, { useEffect, useContext, useState } from 'react';
import FavoriteCard from '../../components/favoriteCard/FavoriteCard';
import Header from '../../components/header/Header';
import RecipeContext from '../../context/RecipeContext';
import './favoriteRecipes.css';

function FavoriteRecipes() {
  const { favoritedRecipes, setFavoritedRecipes } = useContext(RecipeContext);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) setFavoritedRecipes(favoriteRecipes);
    else setFavoritedRecipes([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedRecipes));
  }, [favoritedRecipes]);

  const handleFilters = (event) => {
    const { target: { name } } = event;
    setFilter(name);
  };

  return (
    <div className="favorite-recipes-main">
      <Header title="Favorite Recipes" />
      <div className="favorite-recipes-filter-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name=""
          onClick={ (event) => handleFilters(event) }
          className="favorite-recipes-filter-button"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ (event) => handleFilters(event) }
          className="favorite-recipes-filter-button"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ (event) => handleFilters(event) }
          className="favorite-recipes-filter-button"
        >
          Drink
        </button>
      </div>
      <div className="favorite-recipe-cards">
        { favoritedRecipes
          .filter((favoritedRecipe) => favoritedRecipe.type.includes(filter))
          .map((filteredRecipe, index) => (
            <FavoriteCard
              key={ filteredRecipe.id }
              recipe={ filteredRecipe }
              index={ index }
            />
          ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
