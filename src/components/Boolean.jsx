import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';

export const Boolean = ({ value }) => (
  value === false ?
    <ClearIcon /> :
    value ?
      <CheckIcon /> :
      <RemoveIcon />
);
