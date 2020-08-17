import React from 'react';

import './stats.styles.scss';

const Stats = ({ seconds, matchedPairs, numberOfPairs }) => (
  <div className='stats'>
    <span>Pairs: {matchedPairs}/{numberOfPairs}</span>
    <span>Time: {seconds}</span>
  </div>
);

export default Stats;