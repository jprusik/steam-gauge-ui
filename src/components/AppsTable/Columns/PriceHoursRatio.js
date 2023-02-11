import { useMemo } from 'react';
import { pricePerHourRatio } from 'utils/math';
import { numberValueSum } from 'utils/totals';
import { appFields } from 'constants/appFields';

export const PriceHoursRatio = {
  accessor: ({
    [appFields.STORE_PRICE_DEFAULT_USD]: price,
    [appFields.PLAYTIME_FOREVER]: playtime,
  }) => (price ? pricePerHourRatio(price, playtime) : null),
  Cell: ({value}) => value ? `$${value} / hr` : null,
  Header: 'Price / Hours Played ratio',
  id: appFields.PRICE_HOURS_RATIO,
  Footer: ({ selectedFlatRows }) => {
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
