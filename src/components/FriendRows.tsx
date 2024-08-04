import { Account, App, ErrorMessageKey } from "types";
import { FriendRow } from "components/FriendRow";

type FriendRowsProps = {
  userId: string;
  accounts?: Array<
    Account & { errorMessageKeys?: ErrorMessageKey[] } & { apps: App[] }
  >;
  multiplayerApps?: App[];
};

export const FriendRows = ({
  userId,
  accounts = [],
  multiplayerApps = [],
}: FriendRowsProps): JSX.Element[] | null => {
  const user = accounts.find((account) => account.steamid === userId);
  const orderedFriends = accounts
    .filter((account) => account.steamid !== userId)
    .sort(({ steamid }, { steamid: nextId }) => steamid.localeCompare(nextId));

  if (user) {
    return orderedFriends.map((friend) => (
      <FriendRow
        key={friend.steamid}
        friendData={friend}
        searchUserData={user}
        multiplayerApps={multiplayerApps}
      />
    ));
  }

  return null;
};
