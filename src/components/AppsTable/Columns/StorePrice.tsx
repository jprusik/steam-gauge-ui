import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { numberValueAverage, numberValueSum } from "utils/totals";
import { roundToPlaces } from "utils/math";

export const StorePrice = {
  accessor: appFields.STORE_PRICE_DEFAULT_USD,
  Cell: ({ value }: { value?: number }) => (value ? `$${value}` : null),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const { valueSum, valueAverage } = useMemo(
      () => ({
        valueSum: numberValueSum(
          selectedFlatRows,
          appFields.STORE_PRICE_DEFAULT_USD,
        ),
        valueAverage: numberValueAverage(
          selectedFlatRows,
          appFields.STORE_PRICE_DEFAULT_USD,
        ),
      }),
      [selectedFlatRows],
    );

    return (
      <div>
        <div>${roundToPlaces(valueSum, 2)} (total)</div>
        {valueAverage ? <div>${valueAverage} (average)</div> : null}
      </div>
    );
  },
  Header: "Regular Price (USD)",
  minWidth: 90,
  type: "currency",
};
