import React from 'react';

const AccountLink = ({accountID, linkType='account'}) => (
  <React.Fragment>
    <p>Your Steam account ID (click to visit your {linkType} page):</p>
    <a href={`/${linkType}/${accountID}`} className="open-modal">{accountID}</a>
  </React.Fragment>
);

export default AccountLink;
