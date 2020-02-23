import React from 'react';
import {logoutUser} from '../actions';


const LogoutLink = ({setUser}) =>
  <button
    onClick={() => logoutUser().then(response => setUser(response))}
    className="btn btn-primary btn-sm navbar-btn"
  >
    Log out
  </button>

export default LogoutLink;
