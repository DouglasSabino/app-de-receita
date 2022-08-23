import React from 'react';
import Header from '../../components/header/Header';
import ExploreButtons from '../../components/exploreButtons/ExploreButtons';
import Footer from '../../components/footer/Footer';
import './ExploreDrinks.css';

function ExploreDrinks() {
  return (
    <>
      <Header title="Explore Drinks" />
      <div className="exploreDrinksContainer">
        <ExploreButtons type="drinks" />
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
