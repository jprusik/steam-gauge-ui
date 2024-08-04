import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { booleanCount } from "utils/totals";
import { Boolean } from "components/Boolean";

export const Multiplayer = {
  accessor: appFields.MULTIPLAYER,
  Cell: ({ row }: { row: Row }) => (
    <Boolean value={row.values[appFields.MULTIPLAYER]} />
  ),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.OS_LINUX),
      [selectedFlatRows],
    );

    return `${total} multiplayer game(s)`;
  },
  Header: "Multiplayer",
  minWidth: 70,
};
