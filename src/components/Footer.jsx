import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer className="footer footer-inverse">
    <div className="container">
      <div className="text-muted">
        <div className="footer-nav">
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/privacy">Privacy</Link>
        </div>
        <div className="site-info">
          Database last updated at {process.env.REACT_APP_LAST_DB_UPDATE}
          <br />
          <a href="https://store.steampowered.com">Powered by Steam.</a> Valve and Steam are trademarks of Valve Corporation. {process.env.REACT_APP_PRETTY_DOMAIN_URL} is not affiliated with Valve in any way.<br />2013-2018, {process.env.REACT_APP_APP_NAME} | Developed by <a href={`${process.env.REACT_APP_AUTHOR_WEBSITE}`}>{process.env.REACT_APP_AUTHOR_NAME}</a>. Questions? Notice an issue? Let me know at <a href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}>{process.env.REACT_APP_SUPPORT_EMAIL}</a>
          <br />
          <br />
          Support development: <a href={ process.env.REACT_APP_PAYPAL_ADDRESS }><i className="fa fa-paypal"></i>PayPal</a> | <a href={`bitcoin:${process.env.REACT_APP_BITCOIN_ADDRESS}`}><i className="fa fa-bitcoin"></i>bitcoin</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
