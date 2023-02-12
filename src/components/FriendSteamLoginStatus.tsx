import styled from '@emotion/styled';
import {PersonaState} from 'components/PersonaState';

export const FriendSteamLoginStatus = ({
  personaState
}: {personaState: number}): JSX.Element => (
  <div>
    <StatusSectionHeader>This user is currently:</StatusSectionHeader>
    <br/>
    <PersonaState state={personaState} />
  </div>
);

const StatusSectionHeader = styled.div`
  line-height: 1.5em;
  font-weight: bold;
`;
