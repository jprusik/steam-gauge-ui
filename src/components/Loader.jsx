/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/core';
import SettingsIcon from '@material-ui/icons/Settings';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const loaderIconStyles = css`
  animation-name: ${spin};
  animation-duration: 3000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  color: #EEEEEE;
  height: 100% !important;
  width: auto !important;
`;

export const Loader = ({loaderStyles = ''}) => (
  <div css={css`${loaderStyles}`}>
    <SettingsIcon css={loaderIconStyles} />
  </div>
);

export const SectionLoader = () => (
  <Loader loaderStyles="
      display: block;
      height: 20vh;
      margin: 20px auto 0 auto;
      width: 20vh;
    "
  />
);
