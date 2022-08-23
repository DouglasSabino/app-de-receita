import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import RecipeContext from '../../context/RecipeContext';
import { fetchFoodfilter } from '../../service/ServiceApi';
import './ExploreFoodIngredients.css';

function ExploreFoodIngredients() {
  const [ingredientsFood, setIgredientsFood] = useState([]);
  const { setIngredientsExplore } = useContext(RecipeContext);
  const history = useHistory();
  const Twelve = 12;

  useEffect(() => {
    const fetchIngredientsFood = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(URL);
      const data = await response.json();
      setIgredientsFood(data.meals.slice(0, Twelve));
    };
    fetchIngredientsFood();
  });

  async function handleFilter(ingredient) {
    const foodsList = await fetchFoodfilter(ingredient, 'i');
    setIngredientsExplore(foodsList.meals.slice(0, Twelve));
    history.push('/foods');
  }

  return (
    <>
      <Header title="Explore Ingredients" />
      <div className="foodsCard">
        {
          ingredientsFood.map((ingredients, index) => (
            <div
              className="foodsIngredients-card"
              key={ index }
            >
              <button
                data-testid={ `${index}-ingredient-card` }
                to="/foods"
                onClick={ () => handleFilter(ingredients.strIngredient) }
                type="button"
                className="buttonFoodsIngredient"
              >
                <img
                  src={
                    `https://www.themealdb.com/images/ingredients/${ingredients.strIngredient}-Small.png`
                  }
                  alt={ ingredients.strIngredient }
                  data-testid={ `${index}-card-img` }
                  className="foodIngredientImg"
                />
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  {ingredients.strIngredient}
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

export default ExploreFoodIngredients;
