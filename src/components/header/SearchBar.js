import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import { fetchFoodfilter, fetchDrinkfilter } from '../../service/ServiceApi';
import './header.css';

function SearchBar({ searchType }) {
  const history = useHistory();
  const { setDrinks, setFoods } = useContext(RecipeContext);
  const [radioValue, setRadioValue] = useState('i');
  const [inputTextValue, setInputTextValue] = useState('');

  const fetchRecipes = async () => {
    if (searchType === 'Drinks') {
      const drinks = await fetchDrinkfilter(inputTextValue, radioValue);
      if (!drinks) return;
      setDrinks(drinks.drinks);
      if (drinks.drinks.length === 1) {
        history.push(`/drinks/${drinks.drinks[0].idDrink}`);
      }
    } else {
      const foods = await fetchFoodfilter(inputTextValue, radioValue);
      setFoods(foods.meals);
      if (foods.meals.length === 1) {
        history.push(`/foods/${foods.meals[0].idMeal}`);
      }
    }
  };

  const verifyLength = () => {
    if (radioValue === 'f' && inputTextValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      fetchRecipes();
    }
  };

  return (
    <section className="search-bar">
      <div className="search-bar-text-input">
        <input
          type="text"
          data-testid="search-input"
          value={ inputTextValue }
          onChange={ ({ target }) => setInputTextValue(target.value) }
        />
      </div>
      <div className="search-bar-filters">
        <label
          htmlFor="ingredient"
          className="search-bar-label"
        >
          Ingredient
          <input
            name="radioSelect"
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            value="i"
            onChange={ ({ target }) => setRadioValue(target.value) }
            defaultChecked
          />
        </label>

        <label
          htmlFor="name"
          className="search-bar-label"
        >
          Name
          <input
            name="radioSelect"
            type="radio"
            data-testid="name-search-radio"
            id="name"
            value="s"
            onChange={ ({ target }) => setRadioValue(target.value) }
          />
        </label>

        <label
          htmlFor="first-letter"
          className="search-bar-label"
        >
          First Letter
          <input
            name="radioSelect"
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            value="f"
            onChange={ ({ target }) => setRadioValue(target.value) }
          />
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        className="search-bar-button"
        onClick={ verifyLength }
      >
        search
      </button>
    </section>
  );
}

SearchBar.propTypes = {
  searchType: PropTypes.string.isRequired,
};

export default SearchBar;
