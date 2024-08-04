import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import minMax from "dayjs/plugin/minMax";
import { roundToPlaces } from "utils/math";

dayjs.extend(localizedFormat);
dayjs.extend(minMax);

export function uniqueValueCount(rows, fieldName) {
  return rows.reduce(
    (uniqueItems, { values: { [fieldName]: fieldValues = [] } }) => {
      const newItems = fieldValues.filter(
        (item) => !uniqueItems.includes(item),
      );

      return [...uniqueItems, ...newItems];
    },
    [],
  );
}

export function booleanCount(rows, fieldName) {
  return rows.reduce(
    (count, row) => count + (row.values[fieldName] ? 1 : 0),
    0,
  );
}

export function countByCategory(rows, fieldName) {
  return rows.reduce(
    (countByCategory, { values: { [fieldName]: fieldValue } }) => {
      if (!fieldValue) {
        return {
          ...countByCategory,
          none: countByCategory.none + 1,
        };
      }

      const categoryValue = countByCategory[fieldName];

      return {
        ...countByCategory,
        [fieldName]: categoryValue ? categoryValue + 1 : 1,
      };
    },
    { none: 0 },
  );
}

export function numberValueSum(rows, fieldName) {
  return rows.reduce((sum, row) => {
    // optionally use a passed value selector
    const fieldValue =
      typeof fieldName === "function" ? fieldName(row) : row.values[fieldName];

    return fieldValue ? sum + fieldValue : sum;
  }, 0);
}

export function numberValueAverage(
  rows,
  fieldName,
  includeImplicitValues = false,
) {
  const { count, sum } = rows.reduce(
    (countAndSum, row) => {
      // optionally use a passed value selector
      const fieldValue =
        typeof fieldName === "function"
          ? fieldName(row)
          : row.values[fieldName];

      if ((fieldValue && fieldValue > -1) || includeImplicitValues) {
        return {
          count: countAndSum.count + 1,
          sum: countAndSum.sum + fieldValue,
        };
      }

      return {
        count: countAndSum.count,
        sum: countAndSum.sum,
      };
    },
    { count: 0, sum: 0 },
  );

  return roundToPlaces(sum / count, 2);
}

export function dateRange(rows, fieldName) {
  const dateArray = rows.reduce((dates, row) => {
    const fieldValue = row.values[fieldName];

    if (fieldValue) {
      const dateObject = dayjs(fieldValue);

      return dateObject.isValid() ? [...dates, dayjs(fieldValue)] : dates;
    }

    return dates;
  }, []);

  return dateArray.length > 1
    ? { minDate: dayjs.min(dateArray), maxDate: dayjs.max(dateArray) }
    : { minDate: null, maxDate: null };
}
