/** @format */

function sort(arr) {
  function check(n) {
    if (n % 2 !== 0) {
      return false;
    }
    return true;
  }

  let i = 0;
  let j = 1;

  while (i < arr.length && j < arr.length) {
    if (check(arr[i])) {
      i += 2;
    } else if (!check(arr[j])) {
      j += 2;
    } else {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 2;
      j += 2;
    }
  }
}
