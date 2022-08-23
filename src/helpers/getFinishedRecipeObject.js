export default function getFinishedRecipeObject(recipe) {
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
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      doneDate: new Date().toLocaleDateString(),
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
      tags: [],
      doneDate: new Date().toLocaleDateString(),
    };
  }
  return favoriteRecipeObj;
}
