import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { booleanCount } from "utils/totals";
import { Boolean } from "components/Boolean";

export const OsWindows = {
  accessor: appFields.OS_WINDOWS,
  Cell: ({ row }: { row: Row }) => (
    <Boolean value={row.values[appFields.OS_WINDOWS]} />
  ),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_WINDOWS),
      [selectedFlatRows],
    );

    return `${total} Windows game(s)`;
  },
  Header: "Windows",
  minWidth: 56,
  type: "boolean",
};
