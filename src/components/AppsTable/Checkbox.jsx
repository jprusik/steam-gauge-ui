import styled from '@emotion/styled';
import { forwardRef, useEffect, useRef } from 'react';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

export const Checkbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <CheckboxContainer onClick={rest.onChange}>
        {indeterminate ?
          <IndeterminateCheckBoxIcon /> :
          rest.checked ?
            <CheckBox /> :
            <CheckBoxOutlineBlank />
        }
        <input
          aria-checked={rest.checked}
          aria-label="row-selection"
          hidden={true}
          ref={resolvedRef}
          type="checkbox"
          {...rest}
        />
      </CheckboxContainer>
    );
  }
);

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
`;
