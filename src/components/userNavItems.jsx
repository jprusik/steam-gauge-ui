import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {logoutUser} from '../actions';

const AccountLink = ({accountId}) => (
  <li key="account" className="steam-account">
    <Link to={`/account/${accountId}`} className="open-modal"><i className="fa fa-user fa-fw"></i> Your account</Link>
  </li>
);

const LogoutButton = ({setUser}) => (
  <li key="logout" className="steam-logout">
    <div className="btn-group">
      <button
        onClick={() => logoutUser().then(response => setUser(response))}
        className="btn btn-primary btn-sm navbar-btn"
      >
        Log out
      </button>
    </div>
  </li>
);

const LoginButton = () => (
  <li className="steam-login">
    <div className="btn-group">
      <Link to="/login" className="btn btn-primary btn-sm navbar-btn">Log in</Link>
    </div>
  </li>
);

const UserNavItems = ({user: {account_id: accountId}, setUser}) =>
  !accountId ? (
    <LoginButton />
  ) : (
    <Fragment>
      <AccountLink accountId={accountId} />
      <LogoutButton setUser={setUser} />
    </Fragment>
  );

export default UserNavItems;
