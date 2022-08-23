import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import RecipeContext from '../../context/RecipeContext';
import './profile.css';

function Profile() {
  const { user, setUser } = useContext(RecipeContext);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
      setUser({ email: localStorageUser.email });
    }
  }, []);

  const history = useHistory();
  return (
    <div>
      <Header title="Profile" />
      <div className="profile-page">
        <p
          data-testid="profile-email"
          className="profile-page-email"
        >
          { user.email }
        </p>
        <Link
          to="done-recipes"
          className="profile-page-link"
        >
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profile-page-button"
          >
            Done Recipes
          </button>
        </Link>
        <Link
          to="favorite-recipes"
          className="profile-page-link"
        >
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profile-page-button"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          type="button"
          data-testid="profile-logout-btn"
          className="profile-page-button"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
