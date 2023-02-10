import styled from '@emotion/styled';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const SortIcon = ({order}) => (
  <SortIconsContainer>
    <ArrowDropUpIcon htmlColor={order === 'asc' ? '#8bb9e0' : '#FFFFFF'} />
    <ArrowDropDownIcon htmlColor={order === 'desc' ? '#8bb9e0' : '#FFFFFF'} />
  </SortIconsContainer>
);

const containerHeight = 16;

const SortIconsContainer = styled.div`
  position: relative;
  width: ${containerHeight}px;
  height: ${containerHeight}px;
  overflow: hidden;

  svg {
    position: absolute;
    width: auto;
    height: ${containerHeight}px;

    :first-of-type {
      top: -${containerHeight * 0.2}px;
    }
    :nth-of-type(2) {
      bottom: -${containerHeight * 0.2}px;
    }
  }
`;
