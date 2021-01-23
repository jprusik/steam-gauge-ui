import { appFields } from 'constants/appFields';

export const ReleaseDate = {
  accessor: appFields.RELEASE_DATE,
  Header: 'Release Date',
  minWidth: 52,
  sortType: ({ values: { [appFields.RELEASE_DATE]: value } }, { values: { [appFields.RELEASE_DATE]: nextValue } }) => {
    if (
      (!value && !nextValue) ||
      (value && !nextValue)
    ) {
      return 1;
    }

    if (!value && nextValue) {
      return -1;
    }

    const date = new Date(value);
    const nextDate = new Date(nextValue);

    return date > nextDate ? 1 : -1;
  }
};
