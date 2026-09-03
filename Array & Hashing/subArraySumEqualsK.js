/** @format */

const sub = (arr, k) => {
  let map = new Map();

  let sum = 0;
  let count = 0;

  map.set(0, 1);

  for (let val of arr) {
    sum += val;

    let need = val - k;

    if (map.has(need)) {
      count += map.get(need);
    }

    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
};
