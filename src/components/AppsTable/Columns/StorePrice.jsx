import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { numberValueAverage, numberValueSum } from 'utils/totals';
import { roundToPlaces } from 'utils/math';

export const StorePrice = {
  accessor: appFields.STORE_PRICE_DEFAULT_USD,
  Cell: ({value}) => value ? `$${value}` : null,
  Footer: ({ selectedFlatRows }) => {
    const {valueSum, valueAverage} = useMemo(
      () => ({
        valueSum: numberValueSum(selectedFlatRows, appFields.STORE_PRICE_DEFAULT_USD),
        valueAverage: numberValueAverage(selectedFlatRows, appFields.STORE_PRICE_DEFAULT_USD)
      }),
      [selectedFlatRows]
    );

    return (
      <div>
        <div>${roundToPlaces(valueSum, 2)} (total)</div>
        {valueAverage ? (
          <div>${valueAverage} (average)</div>
        ) :
          null
        }
      </div>
    );
  },
  Header: 'Regular Price (USD)',
  minWidth: 90,
  type: 'currency',
};
