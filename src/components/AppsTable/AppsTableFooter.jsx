import styled from '@emotion/styled';

export const AppsTableFooter = ({footerGroups}) => {
  return (
    <TableFooter>
      {footerGroups.map(group => (
          <TableFooterRow {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              <AppsTableFooterCell {...column.getFooterProps()}>
                {column.render('Footer')}
              </AppsTableFooterCell>
            ))}
          </TableFooterRow>
        ))}
    </TableFooter>
  );
}

const TableFooter = styled.tfoot`
  border-top: 1px solid #a0a0a0;
  background-color: #74706f;
  text-align: left;
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: bold;
`;

const TableFooterRow = styled.tr`
  display: table-row;
  outline: 0;
  color: #FFFFFF;
`;

const AppsTableFooterCell = styled.td`
  display: table-cell;
  border-top: 1px solid #ddd;
  border-right: 1px solid #666666;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  background-color: #74706f;
  padding: 8px;
  vertical-align: top;
  text-align: left;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
`;
