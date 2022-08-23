import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import Recommendation from '../../components/recommendations/recommendation';
import FavoriteButton from '../../components/favoriteButton/FavoriteButton';
import RecipeButton from '../../components/recipeDetailsbutton/Recipesbutton';
import '../detailsRecipe.css';

function DetailsFood(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState([]);
  const [foodById, setFoodById] = useState({});
  const [shareValue, setShareValue] = useState(false);
  const history = useHistory();
  const Twenty = 20;

  const filterIngredients = () => {
    const array = [];
    for (let index = 1; index <= Twenty; index += 1) {
      if (foodById[`strIngredient${index}`] !== ''
        && foodById[`strIngredient${index}`] !== null) {
        array
          .push(`${foodById[`strIngredient${index}`]} -
          ${foodById[`strMeasure${index}`]}`);
      }
    }
    return array;
  };

  const fetchFoodsID = async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    setFoodById(data.meals[0]);
  };

  useEffect(() => {
    fetchFoodsID();
  }, []);

  useEffect(() => {
    setDetails(filterIngredients());
  }, [foodById]);

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
        src={ foodById.strMealThumb }
        alt={ foodById.strMeal }
        data-testid="recipe-photo"
        className="details-recipe-image"
      />
      <div className="details-recipe-header">
        <div className="details-recipe-header-title">
          <h1 data-testid="recipe-title">
            { foodById.strMeal }
          </h1>
          <p data-testid="recipe-category">
            {foodById.strCategory}
          </p>
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
          <FavoriteButton recipe={ foodById } />
        </div>
      </div>
      <div className="details-recipe-instructions details-recipe-block">
        <h4>
          Instructions
        </h4>
        <p data-testid="instructions">
          {foodById.strInstructions}
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
      <div className="details-recipe-video details-recipe-block">
        <h4>
          Video
        </h4>
        <iframe
          src={
            (foodById.strYoutube) && (
              foodById.strYoutube
                .replace('watch?v=', 'embed/'))
          }
          title="Food Video"
          data-testid="video"
        />
      </div>
      <div className="details-recipe-recommendations">
        <h4>
          Recommended
        </h4>
        <section>
          <Recommendation title="meals" />
        </section>
      </div>
      <RecipeButton recipe={ foodById } />
    </div>
  );
}

DetailsFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailsFood;
