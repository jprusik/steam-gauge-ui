import {roundToPlaces} from './math';

export function uniqueValueCount(rows, fieldName) {
  return rows.reduce((uniqueItems, {values: {[fieldName]: fieldValues = []}}) => {
    const newItems = fieldValues.filter(item => !uniqueItems.includes(item));

    return [...uniqueItems, ...newItems];
  }, []);
}

export function booleanCount(rows, fieldName) {
  return rows.reduce((count, row) => count + (row.values[fieldName] ? 1 : 0), 0);
}

export function countByCategory (rows, fieldName) {
  return rows.reduce((countByCategory, {values: {[fieldName]: fieldValue}}) => {
    if (!fieldValue) {
      return {
        ...countByCategory,
        none: countByCategory.none + 1
      };
    }

    const categoryValue = countByCategory[fieldName];

    return {
      ...countByCategory,
      [fieldName]: categoryValue ?
        categoryValue + 1 : 1
    };
  }, {none: 0});
}

export function numberValueSum (rows, fieldName) {
  return rows.reduce((sum, row) => {
    const fieldValue = row.values[fieldName];

    return fieldValue ? sum + fieldValue : sum;
  }, 0);
}

export function numberValueAverage (
  rows,
  fieldName,
  includeImplicitValues = false
) {
  const {count, sum} = rows.reduce((countAndSum, row) => {
    const fieldValue = row.values[fieldName];

    if (
      (row.values[fieldName] && fieldValue > -1) ||
      includeImplicitValues
    ) {
      return {
        count: countAndSum.count + 1,
        sum: countAndSum.sum + fieldValue
      };
    }

    return {
      count: countAndSum.count,
      sum: countAndSum.sum
    };
  }, {count: 0, sum: 0});

  return roundToPlaces(sum / count, 1)
}
