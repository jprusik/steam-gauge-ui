import {CommaDelimitedUnorderedList} from '../CommaDelimitedUnorderedList';

export const Publishers = ({value: publishers = []}) => (
  <CommaDelimitedUnorderedList>
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
  </CommaDelimitedUnorderedList>
);
