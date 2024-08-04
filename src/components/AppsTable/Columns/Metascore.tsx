import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { numberValueAverage } from "utils/totals";

export const Metascore = {
  accessor: appFields.METASCORE,
  Cell: ({ row }: { row: Row }) => (
    <a href={row.values[appFields.METASCORE_LINK]}>
      {row.values[appFields.METASCORE]}
    </a>
  ),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const valueAverage = useMemo(
      () => numberValueAverage(selectedFlatRows, appFields.METASCORE),
      [selectedFlatRows],
    );

    return valueAverage ? `${valueAverage} (average)` : null;
  },
  Header: "Metascore",
  minWidth: 61,
  type: "numeric",
};
