import styled from '@emotion/styled';
import { AppsTableHeaderCell } from './AppsTableHeaderCell';

export const AppsTableHeaderRow = ({
  headerGroupProps,
  headers,
}) => (
  <HeaderRow {...headerGroupProps}>
    {headers.map(column => {
      const {key, ...otherHeaderProps} = column.getHeaderProps();

      return (
        <AppsTableHeaderCell
          key={key}
          headerProps={{
            ...otherHeaderProps,
            ...column.getSortByToggleProps()
          }}
          {...column}
        >
          {column.render('Header')}
        </AppsTableHeaderCell>
      )
    })}
  </HeaderRow>
);

const HeaderRow = styled.tr`
  border-bottom: 1px solid #2f2f2f;
  text-align: left;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
`;
