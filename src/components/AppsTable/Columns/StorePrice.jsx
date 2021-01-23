import { appFields } from 'constants/appFields';

export const StorePrice = {
  accessor: appFields.STORE_PRICE_DEFAULT_USD,
  Cell: ({value}) => value ? `$${value}` : null,
  Header: 'Regular Price (USD)',
  minWidth: 73,
  type: 'currency',
};
