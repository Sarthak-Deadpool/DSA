/** @format */

// sorted Array

const twoSum = (arr, target) => {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    let val = arr[i] + arr[j];
    if (val < target) {
      i++;
    }

    if (val > target) {
      j--;
    }

    if (val === target) {
      return [i + 1, j + 1];
    }
  }

  return [-1, -1];
};

const input = [2, 7, 11, 15];

console.log(twoSum(input, 9));
