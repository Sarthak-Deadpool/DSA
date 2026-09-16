/**
 * @format
 * @param{Number[]}arr
 * @param{Number}target
 */

function sum(arr, target) {
  arr.sort((a, b) => a - b);
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < arr.length; j++) {
      if (j > i + 1 && arr[j] === arr[j - 1]) {
        continue;
      }

      let k = j + 1;
      let l = arr.length - 1;

      while (k < l) {
        let sum = arr[i] + arr[j] + arr[k] + arr[k];

        if (sum < target) {
          k++;
        } else if (sum > target) {
          l--;
        } else {
          ans.push([arr[i], arr[j], arr[k], arr[l]]);

          k++;
          l--;
          while (k < l && arr[k] === arr[k - 1]) {
            k++;
          }
        }
      }
    }
  }

  return ans;
}
