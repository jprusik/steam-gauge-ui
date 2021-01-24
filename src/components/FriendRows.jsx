import FriendRow from '../components/FriendRow';

const FriendRows = ({userId, accounts = [], multiplayerApps = []}) => {
  const user = accounts.find(account => account.steamid === userId);
  const orderedFriends = accounts
    .filter(account => account.steamid !== userId)
    .sort(
      ({steamid}, {steamid: nextId}) => steamid.localeCompare(nextId)
    );

  return orderedFriends.map(friend =>
    <FriendRow
      key={friend.steamid}
      friendData={friend}
      searchUserData={user}
      multiplayerApps={multiplayerApps}
    />
  );
}

export default FriendRows;
