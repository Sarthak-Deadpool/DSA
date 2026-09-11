/** @format */

function remove(arr, k) {
  let i = 0;
  let j = arr.length - 1;

  while (i <= j) {
    if (arr[j] === k) {
      j--;
    } else if (arr[i] === k) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    } else {
      i++;
    }
  }
  return i;
}
