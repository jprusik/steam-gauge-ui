import { useMemo } from 'react';
import { Row } from 'react-table';
import { appFields } from 'constants/appFields';
import { uniqueValueCount } from 'utils/totals';
import { CommaDelimitedUnorderedList } from 'components/CommaDelimitedUnorderedList';

export const Developers = {
  accessor: appFields.DEVELOPERS,
  Cell: ({row}: {row: Row}) => (
    <DevelopersCellValue
      value={row.values[appFields.DEVELOPERS]}
    />
  ),
  disableSortBy: true,
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const itemList = useMemo(
      () => uniqueValueCount(selectedFlatRows, appFields.DEVELOPERS),
      [selectedFlatRows]
    );

    return `${itemList.length} unique developer(s)`;
  },
  Header: 'Developers',
  minWidth: 66,
};

const DevelopersCellValue = ({ value: developers = [] }) => (
  <CommaDelimitedUnorderedList>
    {developers.map((developer) => (
      <li key={developer}>
        <a
          href={`https://store.steampowered.com/search/?developer=${developer}`}
          rel="noopener noreferrer">
          {developer}
        </a>
      </li>
    ))}
  </CommaDelimitedUnorderedList>
);
