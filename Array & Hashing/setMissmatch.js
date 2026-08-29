/** @format */

const setMismatch = (arr) => {
  let set = new Set();

  let ans = [];

  for (let val of arr) {
    if (set.has(val)) {
      ans.push(val);
    }

    set.add(val);
  }

  for (let i = 1; i <= arr.length; i++) {
    if (!set.has(i)) {
      ans.push(i);
    }
  }

  return ans;
};

const a = [1, 2, 2, 3];

console.log(setMismatch(a));
