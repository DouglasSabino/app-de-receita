import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  fetchFoodfilter,
  fetchDrinkfilter,
  fetchCategories } from '../../service/ServiceApi';
import RecipeContext from '../../context/RecipeContext';
import './Categories.css';

function Categories({ type }) {
  const { setFoods, setDrinks, setIngredientsExplore } = useContext(RecipeContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesList = await fetchCategories(type);
      setCategories(categoriesList);
    };
    getCategories();
  }, [type]);

  const fetchCategoriesFilter = async (innerText) => {
    if (type === 'food') {
      const foodsList = await fetchFoodfilter(innerText, 'c');
      setFoods(foodsList.meals);
    } else {
      const drinksList = await fetchDrinkfilter(innerText, 'c');
      setDrinks(drinksList.drinks);
    }
  };

  const resetFilters = async () => {
    if (type === 'food') {
      const foodsList = await fetchFoodfilter('', 's');
      setFoods(foodsList.meals);
    } else {
      const drinksList = await fetchDrinkfilter('', 's');
      setDrinks(drinksList.drinks);
    }
  };

  const resetButtonClasses = () => {
    const buttons = document.querySelectorAll('.active');
    buttons.forEach((button) => {
      button.className = 'categories-button';
    });
  };

  const filterByCategories = async ({ target }) => {
    setIngredientsExplore([]);
    const { innerText, className } = target;
    if (className !== 'categories-button active') {
      fetchCategoriesFilter(innerText);
      resetButtonClasses();
      target.className = 'categories-button active';
    } else {
      resetFilters();
      target.className = 'categories-button';
    }
  };

  const maxCategoriesLength = 5;
  const firstFiveCategories = categories.slice(0, maxCategoriesLength);

  return (
    <div className="categories">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          resetFilters();
          resetButtonClasses();
        } }
        className="categories-button"
      >
        All
      </button>
      {
        firstFiveCategories.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ filterByCategories }
            className="categories-button"
          >
            { strCategory }
          </button>
        ))
      }
    </div>
  );
}

Categories.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Categories;
