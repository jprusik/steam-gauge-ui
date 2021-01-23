import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { uniqueValueCount } from 'utils/totals';
import { CommaDelimitedUnorderedList } from 'components/CommaDelimitedUnorderedList';

export const Publishers = {
  accessor: appFields.PUBLISHERS,
  Cell: ({
    row: {
      values: { [appFields.PUBLISHERS]: value },
    },
  }) => <PublishersCellValue value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const itemList = useMemo(
      () => uniqueValueCount(selectedFlatRows, appFields.PUBLISHERS),
      [selectedFlatRows]
    );

    return `${itemList.length} unique publisher(s)`;
  },
  Header: 'Publishers',
  minWidth: 64,
};

const PublishersCellValue = ({ value: publishers = [] }) => (
  <CommaDelimitedUnorderedList>
    {publishers.map((publisher) => (
      <li key={publisher}>
        <a
          href={`https://store.steampowered.com/search/?publisher=${publisher}`}
          rel="noopener noreferrer">
          {publisher}
        </a>
      </li>
    ))}
  </CommaDelimitedUnorderedList>
);