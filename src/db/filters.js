export const orderByString = (array, prop, order = "asc") => {
  let orderedArray = array.sort((a, b) =>
    order === "asc"
      ? a[prop].toLowerCase().localeCompare(b[prop].toLowerCase())
      : b[prop].toLowerCase().localeCompare(a[prop].toLowerCase())
  );
  return orderedArray;
};

export const orderByNumber = (array, prop, order = "asc") => {
  let orderedArray = array.sort((a, b) => {
    if (a[prop] < b[prop]) return order === "asc" ? -1 : 1;
    if (a[prop] > b[prop]) return order === "asc" ? 1 : -1;
    return 0;
  });
  return orderedArray;
};

export const searchByName = (array, search) => {
  let searchFound = array.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return searchFound;
};
