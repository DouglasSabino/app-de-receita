export default function getFavoriteObject(recipe) {
  let favoriteRecipeObj = {};
  if (recipe.idMeal) {
    favoriteRecipeObj = {
      id: recipe.idMeal,
      category: recipe.strCategory,
      type: 'food',
      nationality: recipe.strArea,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
  } else {
    favoriteRecipeObj = {
      id: recipe.idDrink,
      category: recipe.strCategory,
      type: 'drink',
      nationality: '',
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  }
  return favoriteRecipeObj;
}
