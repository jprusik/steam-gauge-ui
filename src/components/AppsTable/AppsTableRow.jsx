import styled from "@emotion/styled";
import { AppsTableCell } from "./AppsTableCell";

function getActiveColumn(cells) {
  return cells.reduce((sortedColumnIndex, cell, index) => {
    if (Number.isInteger(sortedColumnIndex)) {
      return sortedColumnIndex;
    }

    return cell.column.isSorted ? index + 1 : sortedColumnIndex;
  }, null);
}

export const AppsTableRow = ({
  cells,
  isSelected,
  rowProps,
  toggleRowSelected,
}) => (
  <TableRow
    activeColumn={
      // Workaround for not having active column index
      getActiveColumn(cells)
    }
    isSelected={isSelected}
    onClick={() => toggleRowSelected(!isSelected)}
    {...rowProps}
  >
    {cells.map((cell) => {
      const { key, ...otherCellProps } = cell.getCellProps();

      return (
        <AppsTableCell key={key} cellProps={otherCellProps}>
          {cell.render("Cell")}
        </AppsTableCell>
      );
    })}
  </TableRow>
);

const TableRow = styled.tr`
  ${({ activeColumn, isSelected }) => `
    line-height: 1.42857143rem;
    color: #EEEEEE;
    font-size: 10px;

    :hover {
      > td {
        background-color: ${isSelected ? "#333333" : "#444444"};

        ${
          activeColumn
            ? `
          :nth-of-type(${activeColumn}) {
            background-color: ${isSelected ? "#111111" : "#2a2a2a"};
          }
        `
            : ""
        }
      }
    }

    > td {
      background-color: ${isSelected ? "#3d3d3d" : "grey"};

      ${
        activeColumn
          ? `
        :nth-of-type(${activeColumn}) {
          background-color: ${isSelected ? "#222222" : "#2f2f2f"};
        }
      `
          : ""
      }
    }
  `}
`;
