import React from 'react';
import { Link } from 'react-router-dom';

const AppHead = () => {
  return (
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <Link to="/" className="navbar-brand"><i className="icon-dashboard" />Steam Gauge</Link>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <Link to="/"><i className="fa fa-dashboard" style={{marginRight: '0.5em'}}></i>Gauge</Link>
            </li>
            <li>
              <Link to="/friends"><i className="fa fa-users" style={{marginRight: '0.5em'}}></i>Friends</Link>
            </li>
            <li>
              <Link to="/receipt"><i className="fa fa-file-o" style={{marginRight: '0.5em'}}></i>Receipt</Link>
            </li>
            <li class="steam-login">
              <div class="btn-group">
                <Link to="/login" className="btn btn-primary btn-sm navbar-btn">Log in</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHead;
