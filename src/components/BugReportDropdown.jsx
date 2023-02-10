import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BugReportIcon from '@mui/icons-material/BugReport';

const BugReportTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 190px;
  text-align: right;
  line-height: 1em;
  color: #8bb9e0;
  font-size: 0.75em;

  :hover {
    text-decoration: underline;
    color: #337ab7;
  }

  > svg:not(:first-of-type) {
    font-size: 2rem;
  }
`;

export const BugReportDropdown = ({displayDetails, toggleDetails}) => (
  <BugReportTextContainer onClick={() => toggleDetails(!displayDetails)}>
    <BugReportIcon />
    <div>Something off? Report bugs!</div>
    {displayDetails ? (
      <ArrowDropUpIcon />
    ) : (
      <ArrowDropDownIcon />
    )}
  </BugReportTextContainer>
);
