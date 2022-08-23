const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
export async function fetchFoodfilter(text, radio) {
  const foodUrlFilter = `https://www.themealdb.com/api/json/v1/1/filter.php?${radio}=${text}`;
  const foodUrlSearch = `https://www.themealdb.com/api/json/v1/1/search.php?${radio}=${text}`;

  const responseFoods = await fetch(
    radio === 'i' || radio === 'c' || radio === 'a' ? foodUrlFilter : foodUrlSearch,
  );
  const dataFoods = await responseFoods.json();
  if (dataFoods.meals === null) {
    global.alert(alertMessage);
    return { meals: [] };
  }
  return dataFoods;
}

export async function fetchDrinkfilter(text, radio) {
  const drinkUrlFilter = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${radio}=${text}`;
  const drinkUrlSearch = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${radio}=${text}`;

  try {
    const responseDrinks = await fetch(
      radio === 'i' || radio === 'c' ? drinkUrlFilter : drinkUrlSearch,
    );
    const dataDrinks = await responseDrinks.json();
    if (dataDrinks.drinks === null) {
      global.alert(alertMessage);
      return { drinks: [] };
    }
    return dataDrinks;
  } catch (error) {
    global.alert(alertMessage);
  }
}

export async function fetchCategories(type) {
  const URL_TYPE = type === 'food' ? 'themealdb' : 'thecocktaildb';
  const URL = `https://www.${URL_TYPE}.com/api/json/v1/1/list.php?c=list`;

  const responseCategories = await fetch(URL);
  const dataCategories = await responseCategories.json();
  const result = dataCategories.meals || dataCategories.drinks;

  return result;
}
