/** @format */

const dup = (arr) => {
  let ans = [];

  for (let i = 0; i < arr.length; i++) {
    let index = Math.abs(arr[i]) - 1;

    if (arr[index] < 0) {
      ans.push(arr[i]);
    } else {
      arr[index] *= -1;
    }
  }
  return ans;
};

const a = [1, 1, 2, 3, 3];

console.log(dup(a));
