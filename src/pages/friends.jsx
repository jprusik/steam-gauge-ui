import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import _ from 'lodash';

import { fetchAccountApps, fetchAccountDetails, fetchFriendsList, fetchMultiplayerApps } from '../Actions';

import FriendRow from '../components/friendRow';

import './friends.scss';

const buildFriendList = (friends) => {
  return friends.map(friend => friend.steamid);
};

const friendRows = (friends, searchUser, multiplayerAppList) => {
  const orderedFriends = _.orderBy(friends, 'steamid');
  return orderedFriends.map(friend => <FriendRow key={friend.steamid} friendData={friend} searchUserData={searchUser} multiplayerAppList={multiplayerAppList} />);
}

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'searchedUser': {},
      'friendList': [],
      'friendListBuilt': false,
      'multiplayerAppList': [],
      'multiplayerAppListBuilt': false
    }
  }

  componentDidMount() {
    // TODO: if the searched user matches logged in user, use logged in user object instead of querying a new one
    const searchedAccountId = this.props.match.params.id;

    fetchMultiplayerApps()
    .then(data => {
      const parsedData = _.get(data, 'data.applist.apps', []);
      const multiplayerAppList = parsedData.map(app => app.appid);
      this.setState({ multiplayerAppList, 'multiplayerAppListBuilt': true });
    });

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
      this.setState({ 'friendList': friendList });
      return buildFriendList(friendList);
    })
    .then(data => fetchAccountDetails(data))
    .then(data => {
      const detailsList = _.get(data, 'data.players', []);
      this.setState(prevState => ({
        'friendList': _.merge([...prevState.friendList], detailsList)
      }));
      return this.state.friendList;
    })
    .then(data => {
      this.setState({ 'friendList': [] });
      data.forEach(player => {
        fetchAccountApps(player.steamid)
        .then(appData => {
          const appList = _.get(appData, 'data', []);
          this.setState(prevState => ({
            'friendList': [...prevState.friendList, { ...player, 'apps': appList }]
          }));
        });
      });
    })
    .then(()=> this.setState({ 'friendListBuilt': true }));
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
      (this.state.friendListBuilt && this.state.multiplayerAppListBuilt) && friendRows(this.state.friendList, this.state.searchedUser, this.state.multiplayerAppList)
    ];
  };
};

export default FriendsPage;
