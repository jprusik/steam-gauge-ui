import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";

type BooleanProps = {
  value: boolean;
};

export const Boolean = ({ value }: BooleanProps): JSX.Element =>
  value === false ? <ClearIcon /> : value ? <CheckIcon /> : <RemoveIcon />;
