import styled from '@emotion/styled';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export const AppsTablePagination = ({
  canNextPage,
  canPreviousPage,
  maxPageSize,
  nextPage,
  pageIndex,
  pageOptions,
  pageSize,
  previousPage,
  setPageSize,
}) => {
  return (
    <TablePaginationContainer>
      <ButtonContainer>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <NavigateBeforeIcon />
        </Button>
        <div>
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <NavigateNextIcon />
        </Button>
      </ButtonContainer>
      <Selection
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, maxPageSize].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Selection>
    </TablePaginationContainer>
  );
}

const TablePaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  line-height: 1.5em;
  font-size: 12px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  border-color: #555555;
  background-color: #9d9d9d;
  padding: 5px 10px;
  color: #555555;

  :hover {
    :not(:disabled) {
      border-color: #dddddd;
      color: #dddddd;
    }
  }

  :disabled {
    border-color: #888888;
    background-color: transparent;
    cursor: not-allowed;
    color: #888888;
  }
`;

const Selection = styled.select`
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  border-color: #555555;
  background-color: #9d9d9d;
  cursor: pointer;
  padding: 5px 10px;
  color: #555555;
`;
