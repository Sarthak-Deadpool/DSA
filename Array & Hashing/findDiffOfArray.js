/** @format */

const diff = (a1, a2) => {
  let set1 = new Set(a1);
  let set2 = new Set(a2);

  let ans1 = [];
  let ans2 = [];
  for (let val of set1) {
    if (!set2.has(val)) {
      ans1.push(val);
    }
  }

  for (let val of set2) {
    if (!set1.has(val)) {
      ans2.push(val);
    }
  }

  return [ans1, ans2];
};

console.log(diff([1, 2, 3, 3], [1, 2, 2, 4]));
