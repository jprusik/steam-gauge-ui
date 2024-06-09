import styled from '@emotion/styled';
import { AppsTableHeaderCell } from './AppsTableHeaderCell';

export const AppsTableHeaderRow = ({ headerProps, headers }) => {
  const { key: headerRowKey, ...otherHeaderGroupProps } = headerProps || {};

  return (
    <HeaderRow key={headerRowKey} {...otherHeaderGroupProps}>
      {headers.map((column) => {
        const { key: headerColumnKey, ...otherHeaderProps } =
          column.getHeaderProps();

        return (
          <AppsTableHeaderCell
            key={headerColumnKey}
            headerProps={{
              ...otherHeaderProps,
              ...column.getSortByToggleProps(),
            }}
            {...column}>
            {column.render('Header')}
          </AppsTableHeaderCell>
        );
      })}
    </HeaderRow>
  );
};

const HeaderRow = styled.tr`
  border-bottom: 1px solid #2f2f2f;
  text-align: left;
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
`;
