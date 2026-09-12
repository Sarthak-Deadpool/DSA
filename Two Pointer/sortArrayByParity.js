/** @format */

function par(arr) {
  function check(n) {
    if (n % 2 !== 0) {
      return false;
    }
    return true;
  }

  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    if (!check(arr[i]) && check(arr[j])) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    } else if (check(arr[i])) {
      i++;
    } else if (!check(arr[j])) {
      j--;
    }
  }
  console.log(arr);
}
