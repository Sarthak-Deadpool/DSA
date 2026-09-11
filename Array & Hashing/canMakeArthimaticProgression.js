/** @format */

function art(arr) {
  let i = 0;
  let j = i + 1;

  let diff = Math.abs(arr[j] - arr[i]);

  while (j < arr.length) {
    if (diff !== Math.abs(arr[j] - arr[i])) {
      return false;
    }

    i++;
    j++;
  }
  return true;
}

const a = [1, 2, 5];

console.log(art(a));
