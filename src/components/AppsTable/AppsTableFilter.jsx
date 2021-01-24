import { useState } from 'react';
import styled from '@emotion/styled';
import { useAsyncDebounce } from 'react-table';
import FilterListIcon from '@material-ui/icons/FilterList';

export function AppsTableFilter({
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <SearchFilterContainer>
      <FilterListIcon />
      Filter
      <SearchInput
        value={value || ""}
        onChange={({ target }) => {
          setValue(target.value);
          onChange(target.value);
        }}
        placeholder="e.g. Team Fortress"
      />
    </SearchFilterContainer>
  )
}

const SearchFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  width: 245px;
  color: #EEEEEE;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 3px 6px;
  height: 30px;
  color: #555;

  ::placeholder {
    color: lightgrey;
  }
`;
