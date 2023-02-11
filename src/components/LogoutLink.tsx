import {Dispatch} from 'react';
import {logoutUser} from 'actions';
import {User} from 'types';

export const LogoutLink = (
  {setUser}: {setUser: Dispatch<User>}
): JSX.Element => (
  <button
    onClick={() => logoutUser().then(response => setUser(response))}
    className="btn btn-primary btn-sm navbar-btn"
  >
    Log out
  </button>
);
