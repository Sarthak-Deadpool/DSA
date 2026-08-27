/** @format */

const inter = (a1, a2) => {
  let map1 = new Map();

  let ans = [];

  for (let val of a1) {
    map1.set(val, (map1.get(val) || 0) + 1);
  }

  for (let val of a2) {
    map2.set(val, (map2.get(val) || 0) + 1);
  }

  for (let [key, val] of map1) {
    if (map2.has(key)) {
      let n = Math.min(val, map2.get(key));

      while (n > 0) {
        ans.push(val);
        n--;
      }
    }
  }

  return ans;
};

const a1 = [1, 2, 2, 1];
const a2 = [2, 2];

console.log(inter(a1, a2));
