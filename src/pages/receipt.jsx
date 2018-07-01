import React from 'react';
import MetaTags from 'react-meta-tags';

const ReceiptPage = () => {
  return (
    <div className="content-main">
      <MetaTags>
        {/* page metatags here */}
      </MetaTags>
      <div class="jumbotron">
        <h3><em>The Steam Gauge value of my account is waaaaaay more than I actually paid for my games!</em></h3>
        <p>You may have noticed that Steam Gauge only returns the Steam store price of a game, and not the amount you actually paid for it. This is because Valve does not allow access to your Steam transaction history as they do for your account profile and games.</p>
        <p>However, Valve does provide a tool for viewing total spend on your account (it does not include payments to external storefronts for products that redeem on Steam):</p>
        <p><a href="https://help.steampowered.com/accountdata/AccountSpend" target="_blank" rel="noopener noreferrer">https://help.steampowered.com/accountdata/AccountSpend</a></p>
      </div>
      <p>To see a detailed breakdown of your account spending, visit <a href="https://store.steampowered.com/account/history" target="_blank" rel="noopener noreferrer">https://store.steampowered.com/account/history</a>.</p>
      <p>You may view other types of data about your account that Steam stores here: <a href="https://help.steampowered.com/accountdata" target="_blank" rel="noopener noreferrer">https://help.steampowered.com/accountdata</a></p>
      <h3>What is "OldSpend" and "PWSpend"?</h3>
      <p>While "TotalSpend" represents all funds spent on the Steam Account, "OldSpend" represents the subset of that which was spent before Valve's 2015 implementation of "Limited User" account restrictions and "PWSpend" represents funds spent on "Perfect World Entertainment" apps in Steam.</p>
      <h3>Why does this page exist?</h3>
      <p>Until June 2018, Valve did not provide users with a total summary of their spending on Steam. Because of this, Steam Gauge provided a javascript bookmarklet that summarized your account spend data quickly and easily.</p>
      <p>Since Steam now provides this natively, Steam Receipt is no longer maintained. If you're interested in the project code, you can find it <a href="https://github.com/jprusik/steam-receipt-bookmarklet" target="_blank" rel="noopener noreferrer">here</a>.</p>
    </div>
  )
}

export default ReceiptPage;
