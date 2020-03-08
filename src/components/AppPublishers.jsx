/** @jsx jsx */
import {css, jsx} from '@emotion/core';


export const AppPublishers = ({publishers = []}) => (
  <ul css={css`list-style: none;`}>
    { publishers.map(publisher =>
      <li key={publisher}>
        <a
          href={`https://store.steampowered.com/search/?publisher=${publisher}`}
          rel="noopener noreferrer"
        >
          {publisher}
        </a>
      </li>
    ) }
  </ul>
);
