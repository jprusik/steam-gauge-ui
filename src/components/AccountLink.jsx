import {Fragment} from 'react';

const AccountLink = ({accountID, linkType='account'}) => (
  <Fragment>
    <p>Your Steam account ID (click to visit your {linkType} page):</p>
    <a href={`/${linkType}/${accountID}`} className="open-modal">{accountID}</a>
  </Fragment>
);

export default AccountLink;
