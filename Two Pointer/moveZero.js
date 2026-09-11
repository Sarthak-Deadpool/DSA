/** @format */

function move(arr) {
  let i = 0;
  let j = 0;

  while (j < arr.length) {
    if (arr[j] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
    j++;
  }
}
