export const dynamicFilter = (data, filters) => {
  return data.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key];
      const itemValue = item[key];

      if (filterValue === undefined || filterValue === null) {
        continue; // Skip undefined/null filters
      }

      // Handle range filters
      if (
        typeof filterValue === "object" &&
        filterValue.min !== undefined &&
        filterValue.max !== undefined
      ) {
        if (itemValue < filterValue.min || itemValue > filterValue.max) {
          return false; // Item is out of range
        }
      }

      // Handle single-value filters
      else if (typeof filterValue === "string") {
        if (
          !itemValue
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        ) {
          return false; // Item does not match the search term
        }
      }

      // Handle exact match filters (e.g., boolean or numeric)
      else if (filterValue !== itemValue) {
        return false; // Exact match failed
      }
    }
    return true; // All filters matched
  });
};
