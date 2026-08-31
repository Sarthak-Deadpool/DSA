/** @format */

const major = (arr) => {
  let map = new Map();

  let ans = [];
  for (let val of arr) {
    map.set(val, (map.get(val) || 0) + 1);
  }

  for (let [key, val] of map) {
    if (val > Math.floor(arr.length / 3)) {
      ans.push(key);
    }
  }

  return ans;
};

console.log(major([1, 2]));
