import {CommaDelimitedUnorderedList} from './CommaDelimitedUnorderedList';

export const AppPublishers = ({publishers = []}) => (
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
