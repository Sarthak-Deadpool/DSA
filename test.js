/**
 * @format
 * @param {Number[]} arr
 */

function pivot(arr) {
  let leftSum = new Array(arr.length).fill(0);
  leftSum[0] = arr[0];
  let rightSum = new Array(arr.length).fill(0);
  rightSum[arr.length - 1] = arr[arr.length - 1];

  for (let i = 1; i < arr.length; i++) {
    leftSum[i] = leftSum[i - 1] + arr[i];
  }

  for (let i = arr.length - 2; i >= 0; i--) {
    rightSum[i] = rightSum[i + 1] + arr[i];
  }

  for (let i = 0; i < arr.length; i++) {
    if (leftSum[i] === rightSum[i]) {
      return i;
    }
  }

  return -1;
}
