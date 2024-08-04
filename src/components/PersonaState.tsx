import styled from "@emotion/styled/macro";
import BlockIcon from "@mui/icons-material/Block";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Error from "@mui/icons-material/Error";

enum COLORS {
  GREEN = "#61892b",
  GREY = "#9d9d9d",
  RED = "#FF6C00",
  YELLOW = "#FFD100",
}

function getPersonaStateValue(state: number) {
  switch (state) {
    case 0:
      return {
        color: COLORS.GREY,
        icon: AccountCircleIcon,
        stateText: "Offline",
      };
    case 1:
      return {
        color: COLORS.GREEN,
        icon: AccountCircleIcon,
        stateText: "Online",
      };
    case 2:
      return {
        color: COLORS.RED,
        icon: BlockIcon,
        stateText: "Busy",
      };
    case 3:
      return {
        color: COLORS.YELLOW,
        icon: RemoveCircleIcon,
        stateText: "Away",
      };
    case 4:
      return {
        color: COLORS.YELLOW,
        icon: RemoveCircleIcon,
        stateText: "On Snooze",
      };
    case 5:
      return {
        color: COLORS.YELLOW,
        icon: SupervisedUserCircleIcon,
        stateText: "Looking to Trade",
      };
    case 6:
      return {
        color: COLORS.GREEN,
        icon: SupervisedUserCircleIcon,
        stateText: "Looking to Play",
      };
    default:
      return;
  }
}

type PersonaStateProps = {
  showIcon?: boolean;
  showText?: boolean;
  state: number;
};

export function PersonaState({
  showIcon = true,
  showText = true,
  state,
}: PersonaStateProps): JSX.Element {
  const {
    color = COLORS.YELLOW,
    icon: IconComponent = Error,
    stateText = "Unrecognized Status",
  } = getPersonaStateValue(state) || {};

  return (
    <PersonaStateContainer>
      {showIcon && <IconComponent style={{ color }} />}
      {showText && (
        <PersonaStateText color={color}>{stateText}</PersonaStateText>
      )}
    </PersonaStateContainer>
  );
}

const PersonaStateText = styled.span`
  ${({ color }) => `
    border-radius: .25rem;
    background-color: ${color};
    padding: .25rem .5rem;
    text-align: center;
    line-height: 1.5rem;
    white-space: nowrap;
    color: ${color === COLORS.YELLOW ? "#333333" : "#FFFFFF"};
    font-size: 1rem;
    font-weight: 700;
    ${color === COLORS.GREY ? "text-shadow: #333333 1px 1px 0" : ""}
  `}
`;

const PersonaStateContainer = styled.div`
  display: flex;
  align-items: center;

  > svg {
    font-size: 1.5rem;
  }

  > ${PersonaStateText} {
    margin-left: 5px;
  }
`;
