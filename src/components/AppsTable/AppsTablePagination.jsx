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
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

const Button = styled.button`
  background-color: transparent;
  background-image: none;
  border-color: #9d9d9d;
  border-style: solid;
  border-width: 1px;
  color: #9d9d9d;
  padding: 5px 10px;
  line-height: 1.5;
  border-radius: 3px;

  :hover {
    border-color: #ffffff;
    color: #ffffff;
  }

  > svg {
    font-size: 28px;
  }
`;

const Selection = styled.select`
`;
