import React from 'react';
import Header from '../../components/header/Header';
import ExploreButtons from '../../components/exploreButtons/ExploreButtons';
import Footer from '../../components/footer/Footer';
import './ExploreFoods.css';

function ExploreFoods() {
  return (
    <>
      <Header title="Explore Foods" />
      <div className="exploreFoodsContainer">
        <ExploreButtons type="foods" />
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
