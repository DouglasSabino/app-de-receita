import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import './horizontalShareButton.css';

function HorizontalShareButton({ id, type, index }) {
  const [linkWasCopied, setLinkWasCopied] = useState(false);
  const copyRecipeLink = () => {
    const ONE_SECOND = 1000;
    setLinkWasCopied(true);
    setTimeout(() => setLinkWasCopied(false), ONE_SECOND);
    const url = type === 'food'
      ? (`http://localhost:3000/foods/${id}`) : (`http://localhost:3000/drinks/${id}`);
    clipboardCopy(url);
  };

  return (
    <button
      type="button"
      onClick={ copyRecipeLink }
      className="horizontal-share-button"
    >
      { linkWasCopied ? 'Link copied!' : (
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share-logo"
          src={ shareIcon }
          className="horizontal-share-button-icon"
        />
      ) }
    </button>
  );
}

HorizontalShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default HorizontalShareButton;
