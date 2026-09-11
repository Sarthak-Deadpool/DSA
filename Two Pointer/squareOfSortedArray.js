/** @format */

function square(arr) {
  if (arr.length === 1) {
    return [arr[0] * arr[0]];
  }
  let ans = [];

  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    if (Math.abs(arr[i]) > Math.abs(arr[j])) {
      ans.unshift(arr[i] * arr[i]);
      i++;
    } else {
      ans.unshift(arr[j] * arr[j]);
      j--;
    }
  }

  return ans;
}
