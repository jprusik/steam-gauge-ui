/** @jsx jsx */
import {css, jsx} from '@emotion/core';

export const AppDevelopers = ({developers = []}) => (
  <ul css={css`list-style: none;`}>
    { developers.map(developer =>
      <li key={developer}>
        <a
          href={`https://store.steampowered.com/search/?developer=${developer}`}
          rel="noopener noreferrer"
        >
          {developer}
        </a>
      </li>
    ) }
  </ul>
);
