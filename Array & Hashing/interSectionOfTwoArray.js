/** @format */

const inter = (a1, a2) => {
  let set1 = new Set(a1);
  let set2 = new Set(a2);

  let ans = [];
  for (let value of set1) {
    if (set2.has(value)) {
      ans.push(value);
    }
  }

  return ans;
};

const a1 = [1, 1, 2, 2];
const a2 = [2, 2];

console.log(inter(a1, a2));
