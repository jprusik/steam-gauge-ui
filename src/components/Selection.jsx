import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const Selection = ({ appid, selectedApps }) =>
  selectedApps.includes(appid) ?
    <CheckBox /> : <CheckBoxOutlineBlankIcon />;
