import styled from '@emotion/styled';
import { App } from 'types';
import { minutesToHours } from 'utils/math';
import { errorMessage } from 'constants/messages';
import { ErrorMessageKey } from 'types';

type FriendAppsProps = {
  apps: App[];
  errorMessageKeys?: ErrorMessageKey[];
  searchedUserName?: string;
  searchedUserFriendName?: string;
};

export const FriendApps = ({
  apps,
  errorMessageKeys = [],
  searchedUserFriendName,
  searchedUserName,
}: FriendAppsProps): JSX.Element => {
  const friendName = searchedUserFriendName || 'This user';
  const userName = searchedUserName || 'the searched account';
  const sortedApps = apps.sort(({ name }, { name: nextName }) =>
    name.localeCompare(nextName)
  );

  return (
    <div className="col-xs-10 col-md-9">
      {errorMessageKeys.map((messageKey) => (
        <ErrorMessageLine key={messageKey}>
          <strong>{errorMessage[messageKey] || messageKey}</strong>
        </ErrorMessageLine>
      ))}
      <FriendGameList className="multi-column">
        {sortedApps.length ? (
          sortedApps.map((app) => (
            <li key={app.appid} className="friend-gamerow">
              {app.name}{' '}
              <small>({minutesToHours(app.playtime_forever)} hours)</small>
            </li>
          ))
        ) : (
          <li>
            <strong>{friendName}</strong> has no multiplayer games in common
            with <strong>{userName}</strong>
          </li>
        )}
      </FriendGameList>
    </div>
  );
};

const ErrorMessageLine = styled.div`
  margin-bottom: 1rem;
`;

const FriendGameList = styled.ul`
  margin: 0;
  padding: 0 1em;
  border: 0 solid gray;
  border-left: 1px solid #eee;
  border-radius: 5px;
  line-height: 2em;
  list-style: none;
`;
