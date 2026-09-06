/** @format */

const rainWater = (arr) => {
  let i = 0;
  let j = arr.length - 1;

  let leftMax = arr[i];
  let righMax = arr[j];
  let water = 0;

  while (i < j) {
    if (leftMax < righMax) {
      i++;
      leftMax = Math.max(leftMax, arr[i]);
      water = water + leftMax - arr[i];
    } else {
      j--;
      righMax = Math.max(righMax, arr[j]);
      water = water + righMax - arr[j];
    }
  }

  return water;
};
