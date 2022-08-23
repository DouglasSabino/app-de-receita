import React, { useContext, useEffect, useState } from 'react';
import { fetchFoodfilter } from '../../service/ServiceApi';
import RecipeContext from '../../context/RecipeContext';
import '../../pages/exploreFoodsNationalities/exploreFoodsNationalities.css';

function Nationalities() {
  const { setFoods } = useContext(RecipeContext);

  const [nationalities, setNationalities] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const fetchNationalities = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(URL);
      const { meals } = await response.json();
      setNationalities(meals);
    };
    fetchNationalities();
  }, []);

  const fetchFoodsByNationalities = async ({ target }) => {
    const { value } = target;
    if (value !== 'all') {
      const { meals } = await fetchFoodfilter(value, 'a');
      setFoods(meals);
    } else {
      const { meals } = await fetchFoodfilter('', 's');
      setFoods(meals);
    }
    setSelected(value);
  };

  return (
    <select
      name="nationalities"
      id="nationalities-select"
      data-testid="explore-by-nationality-dropdown"
      value={ selected }
      onChange={ fetchFoodsByNationalities }
      className="nationalitieDropDown"
    >
      <option data-testid="All-option" value="all">All</option>
      { nationalities.map(({ strArea }) => (
        <option
          key={ strArea }
          value={ strArea }
          data-testid={ `${strArea}-option` }
        >
          {strArea}
        </option>
      )) }
    </select>
  );
}

export default Nationalities;
