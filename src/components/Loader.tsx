/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/core';
import SettingsIcon from '@mui/icons-material/Settings';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const loaderIconStyles = css`
  width: auto !important;
  height: 100% !important;
  animation-name: ${spin};
  animation-duration: 3000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  color: #EEEEEE;
`;

export const Loader = (
  {loaderStyles = ''}: {loaderStyles: string}
): JSX.Element => (
  <div css={css`${loaderStyles}`}>
    <SettingsIcon css={loaderIconStyles} />
  </div>
);

export const SectionLoader = () => (
  <Loader loaderStyles="
      display: block;
      margin: 20px auto 0 auto;
      width: 20vh;
      height: 20vh;
    "
  />
);
