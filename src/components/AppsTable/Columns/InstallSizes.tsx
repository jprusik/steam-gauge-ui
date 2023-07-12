import { useMemo } from 'react';
import { Row } from 'react-table';
import Remove from '@mui/icons-material/Remove';
import { appFields } from 'constants/appFields';
import { mbToGB, roundToPlaces } from 'utils/math';
import { numberValueSum } from 'utils/totals';

export const InstallSizes = {
  accessor: appFields.SIZE_MB,
  Cell: ({row}: {row: Row}) => (
    <InstallSizesCellValue
      value={row.values[appFields.SIZE_MB] || 0}
      missingDataPlaceholder
    />
  ),
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const valueSum = useMemo(
      () => numberValueSum(selectedFlatRows, appFields.SIZE_MB),
      [selectedFlatRows]
    );

    const totalText =
      valueSum > 1000 ? `${mbToGB(valueSum)} GB` : `${valueSum} MB`;

    const average = roundToPlaces(valueSum / selectedFlatRows.length, 0);

    return (
      <div>
        <div>{totalText} (total)</div>
        {average ? (
          <div>
            {average > 1000
              ? `${mbToGB(average, 1)} GB (average)`
              : `${average} MB (average)`
            }
          </div>
        ) :
          null
        }
      </div>
    );
  },
  Header: 'Install Size',
  minWidth: 46,
  type: 'numeric',
};

const InstallSizesCellValue = ({
  missingDataPlaceholder = false,
  value: sizeMB = 0,
}) => {
  if (!sizeMB || sizeMB === 0) {
    return missingDataPlaceholder ? <Remove /> : <div>0 (MB)</div>;
  }

  const sizeGB = Math.round((sizeMB / 1000) * 10) / 10;

  return (
    <div>{sizeMB > 1000 ? <div>{sizeGB} GB</div> : <div>{sizeMB} MB</div>}</div>
  );
};
