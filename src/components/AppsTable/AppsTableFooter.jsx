import styled from "@emotion/styled";
import { isNumber } from "utils/math";

export function AppsTableFooter({ footerGroups }) {
  return (
    <TableFooter>
      {footerGroups.map((group) => {
        const { key: footerGroupKey, ...otherFooterGroupProps } =
          group.getFooterGroupProps();

        return (
          <TableFooterRow key={footerGroupKey} {...otherFooterGroupProps}>
            {group.headers.map((column) => {
              const { key: footerColumnKey, ...otherFooterColumnProps } =
                column.getFooterProps();

              return (
                <AppsTableFooterCell
                  key={footerColumnKey}
                  {...otherFooterColumnProps}
                  colSpan={isNumber(column.footerSpan) ? column.footerSpan : 1}
                >
                  {column.render("Footer")}
                </AppsTableFooterCell>
              );
            })}
          </TableFooterRow>
        );
      })}
    </TableFooter>
  );
}

const TableFooter = styled.tfoot`
  border-top: 1px solid #a0a0a0;
`;

const TableFooterRow = styled.tr`
  display: table-row;
  outline: 0;
  color: #ffffff;
`;

const AppsTableFooterCell = styled.td`
  display: ${({ colSpan }) => (colSpan === 0 ? "none" : "table-cell")};
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  background-color: #74706f;
  padding: 8px;
  vertical-align: top;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 10px;
  font-weight: bold;

  :not(:last-of-type) {
    border-right: 1px solid #666666;
  }

  > div {
    > div:not(:first-of-type) {
      margin-top: 0.5rem;
      border-top: 1px dotted #666666;
      padding-top: 0.5rem;
    }
  }
`;
