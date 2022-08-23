import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HorizontalShareButton from '../horizontalShareButton/HorizontalShareButton';

function DoneRecipeCard({ recipe, index }) {
  const pathToDetails = recipe.type === 'food' ? (
    `/foods/${recipe.id}`) : `/drinks/${recipe.id}`;

  return (
    <div
      className="done-recipes-card"
    >
      <Link to={ pathToDetails }>
        <img
          height="200px"
          width="200px"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="food"
          className="done-recipes-card-image"
        />
      </Link>
      <div className="done-recipes-card-content">
        <div className="done-recipes-card-title">
          <Link to={ pathToDetails }>
            <h1 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h1>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'food' ? (
              `${recipe.nationality} - ${recipe.category} `
            ) : recipe.alcoholicOrNot }
          </p>
        </div>
        <div className="done-recipes-card-date">
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}
          </p>
          <HorizontalShareButton
            id={ recipe.id }
            type={ recipe.type }
            index={ index }
          />
        </div>
        <div className="done-recipes-card-tags">
          { recipe.tags && recipe.tags.map((tag) => (
            <div
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              className="done-recipes-card-tag"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
