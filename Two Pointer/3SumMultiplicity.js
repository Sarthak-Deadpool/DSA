/**
 * @format
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */

var threeSumMulti = function (arr, target) {
  arr.sort((a, b) => a - b);

  let ans = 0;
  let MOD = 100000007;

  for (let i = 0; i < arr.length; i++) {
    let j = i + 1;
    let k = arr.length - 1;

    while (j < k) {
      let sum = arr[i] + arr[j] + arr[k];

      if (sum < target) {
        j++;
      } else if (sum > target) {
        k--;
      } else {
        if (arr[j] === arr[k]) {
          let count = k - j + 1;

          ans += (count * (count - 1)) / 2;

          ans %= MOD;
        } else {
          let lv = arr[j];
          let rv = arr[k];

          let lc = 0;
          let rc = 0;

          while (j < k && lv === arr[j]) {
            lc++;
            j++;
          }

          while (j < k && rv === arr[k]) {
            rc++;
            k--;
          }

          ans += lc * rc;

          ans %= MOD;
        }
      }
    }
  }
};
