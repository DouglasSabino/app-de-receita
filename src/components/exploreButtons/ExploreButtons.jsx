import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './exploreButtons.css';

function ExploreButtons({ type }) {
  const history = useHistory();

  const fetchFoodOrDrink = async (urlType) => {
    const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    const response = await fetch(urlType === 'foods' ? URL_FOOD : URL_DRINK);
    const data = await response.json();
    const result = data.meals || data.drinks;
    const resultId = result[0].idMeal || result[0].idDrink;
    return resultId;
  };

  const redirectToRandom = async () => {
    const randomId = await fetchFoodOrDrink(type);
    history.push(`/${type}/${randomId}`);
  };

  return (
    <div className="buttonsContainer">
      <div className="buttonsExplore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push(`/explore/${type}/ingredients`) }
          className="ButtonsStyle"
        >
          By Ingredient
        </button>

        { type === 'drinks' ? '' : (
          <button
            type="button"
            data-testid="explore-by-nationality"
            onClick={ () => history.push('/explore/foods/nationalities') }
            className="ButtonsStyle"
          >
            By Nationality
          </button>
        ) }

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectToRandom }
          className="ButtonsStyle"
        >
          Surprise me!
        </button>
      </div>
    </div>
  );
}

ExploreButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreButtons;
