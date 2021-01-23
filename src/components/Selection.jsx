import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export const Selection = ({ appid, selectedApps }) =>
  selectedApps.includes(appid) ?
    <CheckBox /> : <CheckBoxOutlineBlankIcon />;
