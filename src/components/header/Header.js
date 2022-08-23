import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './header.css';

function Header({ title, hasSearch }) {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <header>
      <div className={ hasSearch ? 'header-search' : 'header' }>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
          className="header-button  header-button-profile"
        >
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </button>
        <h3
          data-testid="page-title"
          className="header-title"
        >
          {title}
        </h3>
        {
          hasSearch && (
            <button
              type="button"
              onClick={ () => setIsVisible(!isVisible) }
              className="header-button"
            >
              <img
                src={ searchIcon }
                alt="searchIcon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
        {
          !hasSearch && <div className="header-filler" />
        }
      </div>
      { isVisible && (
        <SearchBar searchType={ title } />
      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  hasSearch: PropTypes.bool,
}.isRequired;

export default Header;
