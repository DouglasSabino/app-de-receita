import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import RecipeContext from '../../context/RecipeContext';
import { fetchDrinkfilter } from '../../service/ServiceApi';
import './ExploreDrinkIngredients.css';

function ExploreDrinkIngredients() {
  const [ingredientsDrink, setIgredientsDrink] = useState([]);
  const { setIngredientsExplore } = useContext(RecipeContext);
  const history = useHistory();
  const Twelve = 12;

  useEffect(() => {
    const fetchIngredientsDrink = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const data = await response.json();
      setIgredientsDrink(data.drinks.slice(0, Twelve));
    };
    fetchIngredientsDrink();
  });

  async function handleFilter(ingredient) {
    const drinkList = await fetchDrinkfilter(ingredient, 'i');
    setIngredientsExplore(drinkList.drinks.slice(0, Twelve));
    history.push('/drinks');
  }

  return (
    <>
      <Header title="Explore Ingredients" />
      <div className="drinksCard">
        {
          ingredientsDrink.map((ingredients, index) => (
            <div
              className="drinksIngredients-card"
              key={ index }
            >
              <button
                data-testid={ `${index}-ingredient-card` }
                to="/drinks"
                onClick={ () => handleFilter(ingredients.strIngredient1) }
                type="button"
                className="buttonDrinkIngredient"
              >
                <img
                  src={
                    `https://www.thecocktaildb.com/images/ingredients/${ingredients.strIngredient1}-Small.png`
                  }
                  alt={ ingredients.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                  className="drinkIngredientImg"
                />
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  {ingredients.strIngredient1}
                </h4>
              </button>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinkIngredients;
