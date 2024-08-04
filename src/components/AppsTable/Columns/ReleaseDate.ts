import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { dateRange } from "utils/totals";

export const ReleaseDate = {
  accessor: appFields.RELEASE_DATE,
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const { minDate, maxDate } = useMemo(
      () => dateRange(selectedFlatRows, appFields.RELEASE_DATE),
      [selectedFlatRows],
    );

    return minDate && maxDate
      ? [minDate.format("LL"), maxDate.format("LL")].join(" - ")
      : null;
  },
  Header: "Release Date",
  minWidth: 52,
  sortType: (
    {
      values: { [appFields.RELEASE_DATE]: value },
    }: { values: { [appFields.RELEASE_DATE]: string } },
    {
      values: { [appFields.RELEASE_DATE]: nextValue },
    }: { values: { [appFields.RELEASE_DATE]: string } },
  ) => {
    if ((!value && !nextValue) || (value && !nextValue)) {
      return 1;
    }

    if (!value && nextValue) {
      return -1;
    }

    const date = new Date(value);
    const nextDate = new Date(nextValue);

    return date > nextDate ? 1 : -1;
  },
};
