import { useMemo } from "react";
import { Cell, Row } from "react-table";
import { appFields } from "constants/appFields";
import { booleanCount } from "utils/totals";
import { Boolean } from "components/Boolean";

export const WorkshopEnabled = {
  accessor: appFields.WORKSHOP_ENABLED,
  Cell: ({ row }: Cell) => (
    <Boolean value={row.values[appFields.WORKSHOP_ENABLED]} />
  ),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.WORKSHOP_ENABLED),
      [selectedFlatRows],
    );

    return `${total} Steam Workshop game(s)`;
  },
  Header: "Steam Workshop",
  minWidth: 66,
  type: "boolean",
};
