import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import './shareButton.css';

function ShareButton() {
  const [linkWasCopied, setLinkWasCopied] = useState(false);
  const copyRecipeLink = () => {
    const ONE_SECOND = 1000;
    setLinkWasCopied(true);
    setTimeout(() => setLinkWasCopied(false), ONE_SECOND);
    clipboardCopy(window.location.href.replace('/in-progress', ''));
  };

  return (
    <button
      type="button"
      onClick={ copyRecipeLink }
      data-testid="share-btn"
      className="share-button"
    >
      { linkWasCopied ? (
        <p
          className="share-button-text"
        >
          Link copied!
        </p>
      ) : (
        <img
          src={ shareIcon }
          alt="icone para compartilhar"
          className="share-button-icon"
        />
      ) }
    </button>
  );
}

export default ShareButton;
