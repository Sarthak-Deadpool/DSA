/** @format */

const valid = (s) => {
  if (s === " ") {
    return true;
  }
  if (s.length === 1) {
    return true;
  }
  let str = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let i = 0;
  let j = str.length - 1;

  while (j > i) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
};
