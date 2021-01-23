import { useMemo } from 'react';
import { appFields } from 'constants/appFields';
import { booleanCount } from 'utils/totals';
import { Boolean } from 'components/Boolean';

export const TradingCardsEnabled = {
  accessor: appFields.TRADING_CARDS_ENABLED,
  Cell: ({
    row: {
      values: { [appFields.TRADING_CARDS_ENABLED]: value },
    },
  }) => <Boolean value={value} />,
  Footer: ({ selectedFlatRows }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.TRADING_CARDS_ENABLED),
      [selectedFlatRows]
    );

    return `${total} Trading Card game(s)`;
  },
  Header: 'Trading Cards',
  minWidth: 56,
  type: 'boolean',
};
