import React, { useContext, useEffect } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Header from '../../components/header/Header';
import Categories from '../../components/categories/Categories';
import Card from '../../components/card/Card';
import { fetchDrinkfilter } from '../../service/ServiceApi';
import Footer from '../../components/footer/Footer';
import '../foods/Foods.css';

function Drinks() {
  const { drinks, setDrinks, ingredientsExplore } = useContext(RecipeContext);

  useEffect(() => {
    const getDrinks = async () => {
      const drinksList = await fetchDrinkfilter('', 's');
      setDrinks(drinksList.drinks);
    };
    getDrinks();
  }, [setDrinks]);

  const maxDrinksLength = 12;
  const first12Drinks = drinks.slice(0, maxDrinksLength);

  return (
    <>
      <Header title="Drinks" hasSearch />
      <div className="main-recipes">
        <Categories type="drink" />
        <div className="recipe-cards">
          {
            ingredientsExplore.length >= 1 ? ingredientsExplore.map((drink, index) => (
              <Card item={ drink } index={ index } key={ index } type="drinks" />))
              : first12Drinks.map((drink, index) => (
                <Card item={ drink } index={ index } key={ index } type="drinks" />))
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
