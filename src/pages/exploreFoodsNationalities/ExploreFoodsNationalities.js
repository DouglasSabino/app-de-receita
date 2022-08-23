import React, { useContext, useEffect } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NationalitiesDropdown from '../../components/nationalities/Nationalities';
import Card from '../../components/card/Card';
import { fetchFoodfilter } from '../../service/ServiceApi';
import './exploreFoodsNationalities.css';

function ExploreFoodNationalities() {
  const { foods, setFoods } = useContext(RecipeContext);

  useEffect(() => {
    const getFoods = async () => {
      const foodsList = await fetchFoodfilter('', 's');
      setFoods(foodsList.meals);
    };
    getFoods();
  }, []);

  const maxFoodsLength = 12;

  const first12Meals = foods.slice(0, maxFoodsLength);

  return (
    <>
      <Header title="Explore Nationalities" hasSearch />
      <div className="nationalities-card">
        <NationalitiesDropdown />
        <div className="nationalities-items">
          {
            first12Meals.map((meal, index) => (
              <Card item={ meal } index={ index } key={ meal.idMeal } type="foods" />))
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodNationalities;
