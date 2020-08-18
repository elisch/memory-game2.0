import React from 'react';

import './level-button.styles.scss';

const LevelButton = ({ level, setLevel}) => (
  <div onClick={() => setLevel(level.pairs)} className='level-button'>
    {level.level}
  </div>
);

export default LevelButton;