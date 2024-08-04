import { useMemo } from "react";
import { Row } from "react-table";
import { appFields } from "constants/appFields";
import { booleanCount } from "utils/totals";
import { Boolean } from "components/Boolean";

export const AchievementsEnabled = {
  accessor: appFields.ACHIEVEMENTS_ENABLED,
  Cell: ({ row }: { row: Row }) => (
    <Boolean value={row.values[appFields.ACHIEVEMENTS_ENABLED]} />
  ),
  Footer: ({ selectedFlatRows }: { selectedFlatRows: Row[] }) => {
    const total = useMemo(
      () => booleanCount(selectedFlatRows, appFields.ACHIEVEMENTS_ENABLED),
      [selectedFlatRows],
    );

    return `${total} game(s) with achievements`;
  },
  Header: "Achievements",
  minWidth: 80,
  type: "boolean",
};
