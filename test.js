/**
 * @format
 * @param{Number[]} arr
 * @param{Number} val
 */

function remove(arr, val) {
  console.log(arr);
  let i = 0;
  let j = 0;

  while (j < arr.length) {
    if (arr[j] !== val) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
    j++;
  }

  console.log(arr);
}

remove([2, 1, 3, 0, 6, 8, 2, 2, 3, 2], 2);
