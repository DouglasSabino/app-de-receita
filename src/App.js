import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './components/login/Login';
import Foods from './pages/foods/Foods';
import DetailsDrink from './pages/detailsDrink/DetailsDrink';
import DetailsFood from './pages/detailsFood/DetailsFood';
import DoneRecipes from './pages/doneRecipies/DoneRecipies';
import DrinkInProgress from './pages/drinkInProgress/DrinkInProgress';
import Drinks from './pages/drinks/Drinks';
import Explore from './pages/explore/Explore';
import ExploreDrinks from './pages/exploreDrinks/ExploreDrinks';
import ExploreDrinkIngredients from
'./pages/exploreDrinkIngredients/ExploreDrinkIngredients';
import ExploreFoodIngredients from
'./pages/exploreFoodIngredients/ExploreFoodIngredients';
import ExploreFoods from './pages/exploreFoods/ExploreFoods';
import ExploreFoodsNationalities from
'./pages/exploreFoodsNationalities/ExploreFoodsNationalities';
import NotFound from './pages/notFound/NotFound';
import FavoriteRecipes from './pages/favoriteRecipes/FavoriteRecipes';
import FoodInProgress from './pages/foodInProgress/FoodInProgress';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/foods"
          component={ Foods }
        />
        <Route
          exact
          path="/drinks"
          component={ Drinks }
        />
        <Route
          exact
          path="/foods/:id"
          component={ DetailsFood }
        />
        <Route
          exact
          path="/drinks/:id"
          component={ DetailsDrink }
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          component={ FoodInProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinkInProgress }
        />
        <Route
          exact
          path="/explore"
          component={ Explore }
        />
        <Route
          exact
          path="/explore/foods"
          component={ ExploreFoods }
        />
        <Route
          exact
          path="/explore/drinks"
          component={ ExploreDrinks }
        />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinkIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        <Route
          exact
          path="/explore/drinks/nationalities"
          component={ NotFound }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/done-recipes"
          component={ DoneRecipes }
        />

        <Route
          exact
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />

      </Switch>
    </RecipeProvider>
  );
}

export default App;
