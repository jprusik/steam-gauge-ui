import { Dispatch, Fragment } from "react";
import { Link } from "react-router-dom";
import { User, UserState } from "types";
import { logoutUser } from "../actions";

const AccountLink = ({ accountId }: { accountId: string }) => (
  <li key="account" className="steam-account">
    <Link to={`/account/${accountId}`} className="open-modal">
      <i className="fa fa-user fa-fw"></i> Account
    </Link>
  </li>
);

const LogoutButton = ({ setUser }: { setUser: Dispatch<User | null> }) => (
  <li key="logout" className="steam-logout">
    <div className="btn-group">
      <button
        onClick={() => {
          logoutUser();
          setUser(null);
        }}
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
      <Link to="/login" className="btn btn-primary btn-sm navbar-btn">
        Log in
      </Link>
    </div>
  </li>
);

const UserNavItems = ({ user, setUser }: UserState) => {
  const accountId = user?.account_id || null;

  return !accountId ? (
    <LoginButton />
  ) : (
    <Fragment>
      <AccountLink accountId={accountId} />
      <LogoutButton setUser={setUser} />
    </Fragment>
  );
};

export default UserNavItems;
