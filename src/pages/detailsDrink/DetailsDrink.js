import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import Recommendation from '../../components/recommendations/recommendation';
import FavoriteButton from '../../components/favoriteButton/FavoriteButton';
import RecipeButton from '../../components/recipeDetailsbutton/Recipesbutton';
import '../detailsRecipe.css';

function DetailsDrink(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState([]);
  const [drinkById, setDrinkById] = useState({});
  const [shareValue, setShareValue] = useState(false);
  const history = useHistory();
  const fifteen = 15;

  const filterIngredients = () => {
    const array = [];
    for (let index = 1; index <= fifteen; index += 1) {
      if (drinkById[`strIngredient${index}`] !== ''
        && drinkById[`strIngredient${index}`] !== null) {
        array
          .push(`${drinkById[`strIngredient${index}`]} - 
          ${drinkById[`strMeasure${index}`]}`);
      }
    }
    return array;
  };

  const fetchDrinksID = async () => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.drinks[0]);
    setDrinkById(data.drinks[0]);
  };

  useEffect(() => {
    fetchDrinksID();
  }, []);

  useEffect(() => {
    setDetails(filterIngredients());
  }, [drinkById]);

  function handleCopy() {
    navigator
      .clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
    setShareValue(true);
    const ONE_SECOND = 1000;
    setTimeout(() => setShareValue(false), ONE_SECOND);
  }

  return (
    <div className="details-recipe-main">
      <img
        src={ drinkById.strDrinkThumb }
        alt={ drinkById.strDrink }
        data-testid="recipe-photo"
        className="details-recipe-image"
      />
      <div className="details-recipe-header">
        <div className="details-recipe-header-title">
          <h1 data-testid="recipe-title">
            { drinkById.strDrink }
          </h1>
          <p data-testid="recipe-category">{drinkById.strAlcoholic}</p>
        </div>
        <div className="details-recipe-header-buttons">
          <button
            type="button"
            onClick={ () => handleCopy() }
            className="details-recipe-header-share"
          >
            {shareValue ? 'Link copied!'
              : (
                <img
                  src={ shareIcon }
                  alt="ShareIcon"
                  data-testid="share-btn"
                  className="details-recipe-header-share-icon"
                />
              ) }
          </button>
          <FavoriteButton recipe={ drinkById } />
        </div>
      </div>
      <div className="details-recipe-instructions details-recipe-block">
        <h4>
          Instructions
        </h4>
        <p data-testid="instructions">
          {drinkById.strInstructions}
        </p>
      </div>
      <div className="details-recipe-ingredients details-recipe-block">
        <h4>
          Ingredients
        </h4>
        <ul>
          {details.map((newIgredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {newIgredient}
            </li>
          ))}
        </ul>
      </div>
      <h4>
        Recommended
      </h4>
      <section>
        <Recommendation title="drinks" />
      </section>
      <RecipeButton recipe={ drinkById } />
    </div>
  );
}

DetailsDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailsDrink;
