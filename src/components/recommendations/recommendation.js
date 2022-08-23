import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.css';

function Recommendation({ title }) {
  const [recommendation, setRecommendation] = useState([]);
  const six = 6;

  async function requestAPI() {
    if (title === 'meals') {
      const URLDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URLDrink);
      const { drinks } = await response.json();
      setRecommendation(drinks.slice(0, six));
    } else {
      const URLFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URLFood);
      const { meals } = await response.json();
      setRecommendation(meals.slice(0, six));
    }
  }

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div
      className="carousel"
    >
      {
        recommendation
          .map((recomendation, index) => {
            let name;
            let img;
            if (title === 'meals') {
              name = recomendation.strDrink;
              img = recomendation.strDrinkThumb;
            } else {
              name = recomendation.strMeal;
              img = recomendation.strMealThumb;
            }
            return (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="recommendation-card"
              >
                <img
                  src={ img }
                  alt={ name }
                  height="200px"
                  width="200px"
                  className="recommendation-card-image"
                />
                <div className="recommendation-card-tile">
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {name}
                  </p>
                </div>
              </div>
            );
          })
      }
    </div>
  );
}

Recommendation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recommendation;
