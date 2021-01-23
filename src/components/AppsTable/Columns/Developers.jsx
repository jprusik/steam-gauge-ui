import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { uniqueValueCount } from 'utils/totals';
import { CommaDelimitedUnorderedList } from 'components/CommaDelimitedUnorderedList';

export const Developers = {
  accessor: appFields.DEVELOPERS,
  Cell: ({
    row: {
      values: { [appFields.DEVELOPERS]: value },
    },
  }) => <DevelopersCellValue value={value} />,
  disableSortBy: true,
  Footer: ({ selectedFlatRows }) => {
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
