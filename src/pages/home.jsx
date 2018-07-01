import React from 'react';
import { Link } from "react-router-dom";

import './home.scss';

const HomePage = () => {
  return (
    <div id="content-main" style={{ margin: '5% auto', width: '90%', maxWidth: '640px' }}>
      <div style={{ margin: '35px auto', textAlign: 'center' }}>
        <h1 style={{ color: '#EEEEEE', letterSpacing: '2px', fontFamily: 'Impact,Arial,sans-serif', textTransform: 'uppercase' }}><i className="fa fa-dashboard" style={{ fontSize: '1.25em' }}></i> {process.env.REACT_APP_NAME}</h1>
        <p className="italic">Get the value and size of your Steam account</p>
      </div>
      <form className="account-search-form open-modal-form" action="./account" method="get" title="Account Search">
        <label htmlFor="basic-url" style={{ fontSize: '11px' }}>Your Steam profile URL:</label>
        <div className="input-group">
          <span className="input-group-addon steam-profile-url" style={{ padding: '6px', fontSize: '12px', color: 'grey', borderWidth: 0, borderRight: '1px solid #CCCCCC' }}>https://steamcommunity.com/id/</span>
          <input type="text" className="form-control url-text" id="basic-url" style={{ borderColor: '#FFFFFF' }} name="username" placeholder="username or id" />
          <span className="input-group-btn">
            <button className="btn btn-default search-submit" type="submit"><i className="fa fa-search fa-fw"></i></button>
          </span>
        </div>
      </form>
      <div style={{ width: '100%', textAlign: 'center', display: 'block', margin: '10px auto', clear: 'both' }}>or</div>
      <div id="steam_login">
        <Link id="steam_login_button" to="/login" />
      </div>
      <div style={{ height: '1em', width: '100%', clear: 'both' }}></div>
      <p style={{ fontSize: '0.75em', paddingTop: '5px', textAlign: 'center', color: '#61892b', fontWeight: 'bold', clear: 'both' }}>Note: Your Steam profile must be <a style={{ textDecoration: 'underline', color: 'rgb(132,188,60)' }} href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401" target="_blank" rel="noopener noreferrer">publicly viewable</a> for this tool to work!</p>
    </div>
  );
}

export default HomePage;
