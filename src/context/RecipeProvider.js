import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [user, setUser] = useState({ email: '' });
  const [drinks, setDrinks] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [isCurretRecipeFinished, setIsCurretRecipeFinished] = useState(false);
  const [finishedRecipes, setFinishedRecipes] = useState([]);
  const [ingredientsProgress, setIngredientsProgress] = useState({
    cocktails: {},
    meals: {},
  });
  const [favItems, setFavItems] = useState(null);
  const [ingredientsExplore, setIngredientsExplore] = useState([]);

  const contextValue = {
    foods,
    setFoods,
    drinks,
    setDrinks,
    setIngredientsProgress,
    ingredientsProgress,
    favoritedRecipes,
    setFavoritedRecipes,
    setFinishedRecipes,
    finishedRecipes,
    isCurretRecipeFinished,
    setIsCurretRecipeFinished,
    favItems,
    setFavItems,
    ingredientsExplore,
    setIngredientsExplore,
    user,
    setUser,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = { children: PropTypes.node.isRequired,
};

export default RecipeProvider;
