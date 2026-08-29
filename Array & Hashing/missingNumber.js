/** @format */

const missing = (arr) => {
  let ans = 0;

  for (let i = 1; i < arr.length; i++) {
    ans ^= i;
  }

  for (let i = 0; i < arr.length; i++) {
    ans ^= arr[i];
  }
  return ans;
};

const a = [3, 0, 1];

console.log(missing(a));
