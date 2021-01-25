import './FriendSteamLoginStatus.scss';
import {PersonaState} from 'components/PersonaState';

export const FriendSteamLoginStatus = ({user: {personastate}}) => (
  <div className="friend-status">
    <span className="friend-current-game">This user is currently:</span>
    <br/>
    <PersonaState state={personastate} />
  </div>
);
