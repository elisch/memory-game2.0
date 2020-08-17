import React from 'react';

import './card.styles.scss';

import {ReactComponent as Checkmark } from '../../assets/check-mark.svg';

const Card = ({ card, onClick }) => {
  const { value, isMatched, isClicked } = card; 
  const image = `url(http://lorempixel.com/400/400/cats/${value}/)`;
  const isDisabled = isMatched || isClicked;

  return (
    <div
      type="button"
      className={`${isDisabled ? 'disabled' : ''} card`}
      onClick={() => onClick(card)}
      disabled={isDisabled ? true : false}
    >
      <div
        className={`${isMatched ? 'isMatched' : ''} background`} 
        style={isDisabled ? { backgroundImage: image} : null}
      />
          {isMatched ? <Checkmark className='check-mark'/> : null}
    </div>
  );
}

export default Card;