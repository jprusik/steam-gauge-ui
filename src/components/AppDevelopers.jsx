import {CommaDelimitedUnorderedList} from './CommaDelimitedUnorderedList';

export const AppDevelopers = ({developers = []}) => (
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
