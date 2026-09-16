/**
 * @format
 * @param {number[]} nums
 * @return {number}
 */

var triangleNumber = function (nums) {
  if (nums.length < 3) {
    return 0;
  }

  nums.sort((a, b) => a - b);

  let count = 0;

  for (let i = 2; i < nums.length; i++) {
    if (nums[k] === 0) {
      continue;
    }
    let j = 0;
    let k = i - 1;

    while (j < k) {
      if (nums[j] + nums[k] > nums[i]) {
        count += k - j;
        k--;
      } else {
        j++;
      }
    }
  }

  return count;
};
