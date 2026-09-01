/** @format */

const dis = (arr) => {
  let ans = [];

  for (let i = 0; i < arr.length; i++) {
    let index = Math.abs(arr[i]) - 1;

    if (arr[index] > 0) {
      arr[index] *= -1;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      ans.push(i + 1);
    }
  }

  return ans;
};

const a = [1, 2, 4, 4];
console.log(dis(a));
