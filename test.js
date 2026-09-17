/**
 * @format
 * @param {number[]} nums
 * @return {number[]}
 */

var sortArrayByParityII = function (nums) {
  function check(n) {
    if (n % 2 === 0) {
      return true;
    }
    return false;
  }

  let i = 0;
  let j = 1;

  while (i < nums.length || j < nums.length) {
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
};
