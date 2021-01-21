import {CommaDelimitedUnorderedList} from '../CommaDelimitedUnorderedList';

export const Genres = ({value: genres = []}) => (
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
