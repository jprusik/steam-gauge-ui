import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { uniqueValueCount } from 'utils/totals';
import { CommaDelimitedUnorderedList } from 'components/CommaDelimitedUnorderedList';

export const Genres = {
  accessor: appFields.GENRES,
  Cell: ({
    row: {
      values: { [appFields.GENRES]: value },
    },
  }) => <GenresCellValue value={value} />,
  disableSortBy: true,
  Footer: ({ selectedFlatRows }) => {
    const itemList = useMemo(
      () => uniqueValueCount(selectedFlatRows, appFields.GENRES),
      [selectedFlatRows]
    );

    return `${itemList.length} unique genre(s)`;
  },
  Header: 'Genres',
  minWidth: 50,
};

export const GenresCellValue = ({ value: genres = [] }) => (
  <CommaDelimitedUnorderedList>
    {genres.map((genre) => (
      <li key={genre}>
        <a
          href={`https://store.steampowered.com/tags/en/${genre}`}
          rel="noopener noreferrer">
          {genre}
        </a>
      </li>
    ))}
  </CommaDelimitedUnorderedList>
);
