import styled from '@emotion/styled';

export const AppsTableCell = ({children, cellProps}) => (
  <TableCell {...cellProps}>
    {children}
  </TableCell>
);

const TableCell = styled.td`
  border-bottom: none !important;
  padding: 1em 0.5em;
  text-shadow: #3d3d3d 1px 1px 1px;

  a {
    text-decoration: none;
    color: #8bb9e0;

    :visited,
    :active,
    :hover {
      color: #337ab7;
    }
  }
`;
