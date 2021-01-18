import { forwardRef, useEffect, useRef } from 'react';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

export const Checkbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <label>
        {indeterminate ?
          <IndeterminateCheckBoxIcon /> :
          rest.checked ?
            <CheckBox /> :
            <CheckBoxOutlineBlank />
        }
        <input type="checkbox" ref={resolvedRef} {...rest} hidden />
      </label>
    )
  }
);
