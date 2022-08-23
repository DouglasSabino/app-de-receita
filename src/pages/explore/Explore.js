import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explore" />
      <section className="exploreContainer">
        <div className="buttonsExplore">
          <div className="buttonsColumn">
            <button
              onClick={ () => history.push('/explore/foods') }
              data-testid="explore-foods"
              type="button"
              className="buttonStyle"
            >
              Explore Foods
            </button>

            <button
              onClick={ () => history.push('/explore/drinks') }
              data-testid="explore-drinks"
              type="button"
              className="buttonStyle"
            >
              Explore Drinks
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
