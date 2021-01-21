import {CommaDelimitedUnorderedList} from '../CommaDelimitedUnorderedList';

export const Developers = ({value: developers = []}) => (
  <CommaDelimitedUnorderedList>
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
  </CommaDelimitedUnorderedList>
);
