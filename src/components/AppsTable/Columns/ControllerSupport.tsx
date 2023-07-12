import { useMemo } from 'react';
import { Row } from 'react-table';
import Remove from '@mui/icons-material/Remove';
import { appFields } from 'constants/appFields';
import { countByCategory } from 'utils/totals';

export const ControllerSupport = {
  accessor: appFields.CONTROLLER_SUPPORT,
  Cell: ({row}: {row: Row}) => (
    <ControllerSupportCellValue
      value={row.values[appFields.CONTROLLER_SUPPORT]}
    />
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const categories = useMemo(
      () => countByCategory(selectedFlatRows, appFields.CONTROLLER_SUPPORT),
      [selectedFlatRows]
    );

    return Object.keys(categories).map((category) => (
      <div key={`${category}-count`}>
        {category}: {categories[category]}
      </div>
    ));
  },
  Header: 'Controller Support',
  minWidth: 70,
};

export const ControllerSupportCellValue = ({value}: {value: boolean}) =>
  value ? <div>{value}</div> : <Remove />;
