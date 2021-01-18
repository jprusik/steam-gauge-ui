import {CommaDelimitedUnorderedList} from './CommaDelimitedUnorderedList';

export const AppGenres = ({genres = []}) => (
  <CommaDelimitedUnorderedList>
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
  </CommaDelimitedUnorderedList>
);
