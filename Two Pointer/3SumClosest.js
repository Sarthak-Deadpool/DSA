/**
 * @format
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */

var threeSumClosest = function (arr, target) {
  arr.sort((a, b) => a - b);

  let sum = arr[0] + arr[1] + arr[arr.length - 1];

  let minDiff = Math.abs(target - sum);

  for (let i = 0; i < arr.length; i++) {
    let j = i + 1;
    let k = arr.length - 1;

    while (j < k) {
      let CurrSum = arr[i] + arr[j] + arr[k];
      let CurrDiff = Math.abs(CurrSum - target);

      if (minDiff > CurrDiff) {
        minDiff = CurrDiff;
        sum = CurrSum;
      }

      if (sum === target) {
        return sum;
      } else if (sum < target) {
        j++;
      } else {
        k--;
      }
    }
  }

  return sum;
};
