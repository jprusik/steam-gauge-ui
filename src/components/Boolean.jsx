import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';

export const Boolean = ({ value }) => (
  value === false ?
    <ClearIcon /> :
    value ?
      <CheckIcon /> :
      <RemoveIcon />
);
