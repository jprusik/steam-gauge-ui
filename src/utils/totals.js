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
  return rows.reduce((sum, row) => sum + (row.values[fieldName] || 0), 0);
}
