import React from 'react';
import Remove from '@material-ui/icons/Remove';

export const ControllerSupport = ({ value }) =>
  value ? <div>{value}</div> : <Remove />;
