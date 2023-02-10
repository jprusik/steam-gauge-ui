import { useMemo } from 'react';
import Remove from '@mui/icons-material/Remove';
import { appFields } from 'constants/appFields';
import { countByCategory } from 'utils/totals';

export const ControllerSupport = {
  accessor: appFields.CONTROLLER_SUPPORT,
  Cell: ({
    row: {
      values: { [appFields.CONTROLLER_SUPPORT]: value },
    },
  }) => <ControllerSupportCellValue value={value} />,
  Footer: ({ selectedFlatRows }) => {
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

export const ControllerSupportCellValue = ({ value }) =>
  value ? <div>{value}</div> : <Remove />;
