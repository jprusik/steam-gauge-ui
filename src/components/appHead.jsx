import React from 'react';
import { Link } from 'react-router-dom';
import './appHead.scss';

const AppHead = (loginStatus) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand"><i className="icon-dashboard" />Steam Gauge</Link>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/"><i className="fa fa-dashboard" style={{marginRight: '0.5em'}}></i>Gauge</Link>
            </li>
            <li>
              <Link to="/friends"><i className="fa fa-users" style={{marginRight: '0.5em'}}></i>Friends</Link>
            </li>
            <li>
              <Link to="/receipt"><i className="fa fa-file-o" style={{marginRight: '0.5em'}}></i>Receipt</Link>
            </li>
            <li className="steam-login">
              <div className="btn-group">
                {
                  (!loginStatus.user || !loginStatus.user.account_id) &&
                  <Link to="/login" className="btn btn-primary btn-sm navbar-btn">Log in</Link>
                }
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHead;
