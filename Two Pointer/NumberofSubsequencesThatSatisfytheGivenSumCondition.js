/**
 * @format
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var numSubseq = function (nums, target) {
  nums.sort((a, b) => a - b);
  let i = 0;
  let j = nums.length - 1;

  const MOD = 1000000007;
  let ans = 0;

  let power = new Array(nums.length);

  power[0] = 1;

  for (let k = 1; k < nums.length; k++) {
    power[k] = (power[k - 1] * 2) % MOD;
  }

  while (i <= j) {
    let sum = nums[i] + nums[j];

    if (sum > target) {
      j--;
    } else {
      ans = (ans + power[j - i]) % MOD;
      i++;
    }
  }

  return ans;
};
