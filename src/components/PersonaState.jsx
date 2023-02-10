import styled from '@emotion/styled';
import BlockIcon from '@mui/icons-material/Block';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const colors = {
  GREEN: '#61892b',
  GREY: '#9d9d9d',
  RED: '#FF6C00',
  YELLOW: '#FFD100',
};

export function PersonaState ({
  showIcon = true,
  showText = true,
  state,
}) {
  let color = colors.GREY;

  switch (state) {
    case 0:
      return (
        <PersonaStateContainer>
          { showIcon && <AccountCircleIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>Offline</PersonaStateText> }
        </PersonaStateContainer>
      );
    case 1:
      color = colors.GREEN;

      return (
        <PersonaStateContainer>
          { showIcon && <AccountCircleIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>Online</PersonaStateText> }
        </PersonaStateContainer>
      );
    case 2:
      color = colors.RED;

      return (
        <PersonaStateContainer>
          { showIcon && <BlockIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>Busy</PersonaStateText> }
        </PersonaStateContainer>
      );
    case 3:
      color = colors.YELLOW;

      return (
        <PersonaStateContainer>
          { showIcon && <RemoveCircleIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>Away</PersonaStateText> }
        </PersonaStateContainer>
      );
    case 4:
      color = colors.YELLOW;

      return (
        <PersonaStateContainer>
          { showIcon && <RemoveCircleIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>On Snooze</PersonaStateText> }
        </PersonaStateContainer>
      );
    case 5:
      color = colors.YELLOW;

      return (
        <PersonaStateContainer>
          { showIcon && <SupervisedUserCircleIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>Looking to Trade</PersonaStateText> }
        </PersonaStateContainer>
      );
    case 6:
      color = colors.GREEN;

      return (
        <PersonaStateContainer>
          { showIcon && <SupervisedUserCircleIcon style={{color}} /> }
          { showText && <PersonaStateText color={color}>Looking to Play</PersonaStateText> }
        </PersonaStateContainer>
      );
    default:
      return null;
  }
}

const PersonaStateContainer = styled.div`
  display: flex;
  align-items: center;

  > svg {
    font-size: 1.5rem;
  }

  > *:not(:first-child) {
    margin-left: 5px;
  }
`;

const PersonaStateText = styled.span`
  border-radius: .25rem;
  background-color: ${({color}) => color};
  padding: .25rem .5rem;
  text-align: center;
  line-height: 1.5rem;
  white-space: nowrap;
  color: ${({color}) => color === colors.YELLOW ? '#333333' : '#FFFFFF'};
  font-size: 1rem;
  font-weight: 700;
  ${({color}) => color === colors.GREY ? 'text-shadow: #333333 1px 1px 0' : ''}
`;
