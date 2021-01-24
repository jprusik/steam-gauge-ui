import {personaStateMap} from '../constants/personaStates';
import './FriendSteamLoginStatus';
import './FriendSteamLoginStatus.scss';

const FriendSteamLoginStatus = ({user: {personastate}}) => {
  const stateText = personaStateMap[personastate].name;
  const stateClass = personaStateMap[personastate].class;

  return (
    <div className="friend-status">
      <span className="friend-current-game">This user is currently:</span>
      <br/>
      <i className={`fa fa-${stateClass}`}></i>{stateText}
    </div>
  );
};

export default FriendSteamLoginStatus
