import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { booleanCount } from "utils/totals";
import { Boolean } from "components/Boolean";

export const OsMac = {
  accessor: appFields.OS_MAC,
  Cell: ({ row }: { row: Row }) => (
    <Boolean value={row.values[appFields.OS_MAC]} />
  ),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_MAC),
      [selectedFlatRows],
    );

    return `${total} Mac game(s)`;
  },
  Header: "Mac",
  minWidth: 36,
  type: "boolean",
};
