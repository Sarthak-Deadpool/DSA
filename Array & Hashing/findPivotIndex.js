/** @format */

const pivot = (arr) => {
  let leftSum = new Array(arr.length).fill(0);
  let rigthSum = new Array(arr.length).fill(0);

  leftSum[0] = arr[0];
  rigthSum[arr.length - 1] = arr[arr.length - 1];

  for (let i = 1; i < arr.length; i++) {
    leftSum[i] = leftSum[i - 1] + arr[i];
  }

  for (let i = arr.length - 2; i >= 0; i--) {
    rigthSum[i] = rigthSum[i + 1] + arr[i];
  }

  for (let i = 0; i < leftSum.length; i++) {
    if (leftSum[i] === rigthSum[i]) {
      return i;
    }
  }

  return -1;
};


