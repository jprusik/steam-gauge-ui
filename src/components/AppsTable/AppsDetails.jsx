import { useMemo } from 'react';
import styled from '@emotion/styled';
import {columnComponentNames} from 'constants/appFields';
import { AppsTable } from 'components/AppsTable/AppsTable';
import * as Columns from 'components/AppsTable/Columns';

export function AppsDetails({ data }) {
  const columns = useMemo(
    () => Object.keys(columnComponentNames).map(component =>
      Columns[columnComponentNames[component]]
    ),
    []
  );

  return (
    <AppDetailsContainer>
      <AppsTable columns={columns} data={data} />
    </AppDetailsContainer>
  );
}

const AppDetailsContainer = styled.div`
  background-color: #555555;
  padding: 0 5px;
`;
