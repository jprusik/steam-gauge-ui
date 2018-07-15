import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import _ from 'lodash';

import { fetchAccountApps, fetchAccountDetails, fetchFriendsList } from '../Actions';

import FriendRow from '../components/friendRow';

import './friends.scss';

const buildFriendList = (friends) => {
  return friends.map(friend => friend.steamid);
};

const friendRows = (friends, searchUser) => {
  return friends.map(friend => <FriendRow key={friend.steamid} friendData={friend} searchUserData={searchUser} />);
}

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'searchedUser': {},
      'friendList': []
    }
  }

  componentDidMount() {
    const searchedAccountId = this.props.match.params.id;

    // TODO: if the searched user matches logged in user, use logged in user object instead of querying a new one
    // Get data for user searched
    fetchAccountDetails(searchedAccountId)
    .then(data => {
      const parsedData = _.get(data, 'data.players[0]', {});
      this.setState({ 'searchedUser': parsedData });
      return parsedData;
    })
    .then(data => fetchAccountApps(data.steamid))
    .then(data => {
      const appList = _.get(data, 'data', []);
      const userDetails = _.merge(appList, this.state.searchedUser);
      return userDetails;
    })
    .then(data => this.setState({ 'searchedUser': data }));

    // Get Friends' Data
    fetchFriendsList(searchedAccountId)
    .then(data => {
      const friendList = _.get(data, 'data.friendslist.friends', []);
      const friendIds = buildFriendList(friendList);

      this.setState({ 'friendList': friendList });
      return friendIds;
    })
    .then(data => fetchAccountDetails(data))
    .then(data => {
      const detailsList = _.get(data, 'data.players', []);
      const friendDetails = _.merge(detailsList, this.state.friendList);

      return friendDetails;
    })
    .then(data => {
      this.setState({ 'friendList': data });

      const updatedData = data.map((player) => {
        const accountApps = fetchAccountApps(player.steamid)
        .then(appData => {
          const appList = _.get(appData, 'data', []);
          return appList;
        });

        return { 'apps': accountApps, ...player };
      });

      return updatedData;
    })
    .then(data => this.setState({ 'friendList': data }));
  }

  render() {
    const mostCommonOwned = 'App Name';
    const leastCommonOwned = 'App Name';
    const mostCommonPlayed = 'App Name';
    // const leastCommonPlayed = 'App Name';

    return [
      <MetaTags key="content-meta">
        {/* page metatags here */}
      </MetaTags>,

      <div key="content-head" className="jumbotron">
        <img className="useravatar" alt="user avatar" src={`${this.state.searchedUser.avatarfull}`}/>
        <h3 className="userhead">
          <a href={this.state.searchedUser.profileurl} target="_blank" rel="noopener noreferrer">{this.state.searchedUser.personaname}</a> and {this.state.friendList.length} friends have these multiplayer games in common:
        </h3>
        <div className="row">
          <div className="col-xs-6">
            Most common among friends: <span className="app-title">{mostCommonOwned}</span>
          </div>
          <div className="col-xs-6">
            Least common among friends: <span className="app-title">{leastCommonOwned}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            Most played among friends: <span className="app-title">{mostCommonPlayed}</span>
          </div>
          <div className="col-xs-6">
            <strong>Share:</strong> <a className="custom-share twitter" href={`https://twitter.com/share?url=https://www.mysteamgauge.com/friends/${this.state.searchedUser.steamid}&amp;text=I%20just%20found%20out%20what%20multiplayer%20games%20my%2016%20friends%20and%20I%20have%20in%20common%20by%20using%20MySteamFriends.com`}><i className="fa fa-twitter"></i></a>&nbsp;<a className="custom-share google-plus" href={`https://plus.google.com/share?url=https://www.mysteamgauge.com/friends/${this.state.searchedUser.steamid}`}><i className="fa fa-google-plus"></i></a>
          </div>
        </div>
      </div>,
      friendRows(this.state.friendList, this.state.searchedUser)
    ];
  };
};

export default FriendsPage;
