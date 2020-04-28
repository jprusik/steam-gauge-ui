/** @jsx jsx */
import {css, jsx} from '@emotion/core';

export const AppGenres = ({genres = []}) => (
  <ul css={css`list-style: none;`}>
    { genres.map(genre =>
      <li key={genre}>
        <a
          href={`https://store.steampowered.com/tags/en/${genre}`}
          rel="noopener noreferrer"
        >
          {genre}
        </a>
      </li>
    ) }
  </ul>
);
