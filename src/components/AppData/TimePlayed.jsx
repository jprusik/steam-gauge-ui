import React from 'react';
import Remove from '@material-ui/icons/Remove';
import {minutesToHours} from '../../utils/math';

export const TimePlayed = ({ value }) =>
  value === 0 ?
      'not played' :
      value > 0 ?
        [
          <div key="total-hours">{minutesToHours(value, 1)} hours</div>,
          <div key="total-minutes">{value} minutes</div>
        ] :
        <Remove />
