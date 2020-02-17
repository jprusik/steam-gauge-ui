import React from 'react';
import './TitleIntro.scss';

const TitleIntro = ({isFriends = false}) => isFriends ?
  (
    <div className="friends-home-header-wrapper">
      <h1><i className="fa fa-group"></i>&nbsp;Steam Friends</h1>
      <p className="italic">Find out what multiplayer games you and your friends have in common</p>
    </div>
  ) : (
    <div className="app-title">
      <h1><i className="fa fa-dashboard"></i> {process.env.REACT_APP_NAME}</h1>
      <p className="italic">Get the value and size of your Steam account</p>
    </div>
  );

export default TitleIntro;
