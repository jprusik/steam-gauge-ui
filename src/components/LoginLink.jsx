import React from 'react';
import {Link} from 'react-router-dom';
import './LoginLink.scss';

const LoginLink = () =>
  <Link className="steam-login-button" to="/login" />;

export default LoginLink;
