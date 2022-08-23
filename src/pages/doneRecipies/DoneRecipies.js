import React, { useState, useEffect } from 'react';
import DoneRecipeCard from '../../components/doneRecipeCard/DoneRecipeCard';
import Header from '../../components/header/Header';
import './doneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [activeFilter, setFilter] = useState('');

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);
  return (
    <div className="done-recipes-main">
      <Header title="Done Recipes" />
      <div className="done-recipes-filter-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="done-recipes-filter-button"
          onClick={ () => {
            setFilter('');
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="done-recipes-filter-button"
          onClick={ () => {
            setFilter('food');
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="done-recipes-filter-button"
          onClick={ () => {
            setFilter('drink');
          } }
        >
          Drink
        </button>
      </div>
      <div className="done-recipes-cards">
        {doneRecipes && doneRecipes
          .filter((recipe) => recipe.type.includes(activeFilter))
          .map((recipe, index) => (
            <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
          )) }
      </div>
    </div>
  );
}

export default DoneRecipes;
