import { useMemo } from 'react';
import { Row } from 'react-table';
import { pricePerHourRatio } from 'utils/math';
import { numberValueSum } from 'utils/totals';
import { appFields } from 'constants/appFields';

export const PriceHoursRatio = {
  accessor: ({
    [appFields.STORE_PRICE_DEFAULT_USD]: price,
    [appFields.PLAYTIME_FOREVER]: playtime,
  }: {
    [appFields.STORE_PRICE_DEFAULT_USD]: number,
    [appFields.PLAYTIME_FOREVER]: number,
  }) => (price ? pricePerHourRatio(price, playtime) : null),
  Cell: ({value}: {value: number}) => value ? `$${value} / hr` : null,
  Header: 'Price / Hours Played ratio',
  id: appFields.PRICE_HOURS_RATIO,
  Footer: ({selectedFlatRows}: {selectedFlatRows: Row[]}) => {
    const { playtimeTotal, priceTotal } = useMemo(
      () => ({
        // @TODO: total with a single loop
        playtimeTotal: numberValueSum(
          selectedFlatRows,
          appFields.PLAYTIME_FOREVER
        ),
        priceTotal: numberValueSum(
          selectedFlatRows,
          appFields.STORE_PRICE_DEFAULT_USD
        ),
      }),
      [selectedFlatRows]
    );

    return `$${pricePerHourRatio(priceTotal, playtimeTotal)} / hr`;
  },
  minWidth: 92,
  type: 'numeric',
};
