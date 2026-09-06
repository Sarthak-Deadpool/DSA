/** @format */

const sum3 = (arr) => {
  let a = arr.sort((a, b) => a - b);

  let ans = [];

  for (let i = 0; i < a.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let val = a[i];

    let j = i + 1;
    let k = a.length - 1;

    while (j < k) {
      let v = val + a[j] + a[k];

      if (v < 0) {
        j++;
      } else if (v > 0) {
        k--;
      } else {
        ans.push(a[i], a[j], a[k]);
        j++;
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      }
    }
  }

  return arr;
};
