import { appFields } from 'constants/appFields';

export const StorePrice = {
  accessor: appFields.STORE_PRICE_DEFAULT_USD,
  emptyValue: '',
  Header: 'Regular Price (USD)',
  minWidth: 73,
  type: 'currency',
};
