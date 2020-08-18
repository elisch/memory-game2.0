import React from 'react';

import './start.styles.scss';

import LEVELS from '../../assets/levels.data';
import LevelButton from '../level-button/level-button.component';

const Start = ({ startGame }) =>  {

  const setLevel = level => {
    startGame(level);
  }

  const renderLevelButtons = () => {
    return LEVELS.map((level) => (
      <LevelButton
        key={level.level}
        level={level} 
        setLevel={setLevel}
      />
    ));
  }

  const levelButtons = renderLevelButtons();

  return(
    <div className='pair-input'>
      <h2>Choose level</h2>
      <div className='levels'>
        {levelButtons}
      </div>
    </div>
  )
}

export default Start;