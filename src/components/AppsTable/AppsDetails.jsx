import { useMemo } from 'react';
import styled from '@emotion/styled';
import { columnOptions } from './columnOptions';
import { AppsTable } from './AppsTable';

export function AppsDetails({ data }) {
  const columns = useMemo(
    () => columnOptions(),
    []
  )

  return (
    <AppDetailsContainer>
      <AppsTable columns={columns} data={data} />
    </AppDetailsContainer>
  )
}

const AppDetailsContainer = styled.div`
  background-color: #555555;
  padding: 0 5px;
`;
