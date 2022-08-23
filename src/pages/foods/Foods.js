import React, { useContext, useEffect } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import Categories from '../../components/categories/Categories';
import { fetchFoodfilter } from '../../service/ServiceApi';
import Footer from '../../components/footer/Footer';
import './Foods.css';

function Foods() {
  const { foods, setFoods, ingredientsExplore,
  } = useContext(RecipeContext);

  useEffect(() => {
    const getFoods = async () => {
      const foodsList = await fetchFoodfilter('', 's');
      setFoods(foodsList.meals);
    };
    getFoods();
  }, [setFoods]);

  const maxFoodsLength = 12;

  const first12Meals = foods.slice(0, maxFoodsLength);

  return (
    <>
      <Header title="Foods" hasSearch />
      <div className="main-recipes">
        <Categories type="food" />
        <div className="recipe-cards">
          {
            ingredientsExplore.length >= 1 ? ingredientsExplore.map((meal, index) => (
              <Card item={ meal } index={ index } key={ meal.idMeal } type="foods" />))
              : first12Meals.map((meal, index) => (
                <Card item={ meal } index={ index } key={ meal.idMeal } type="foods" />))
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Foods;
