/** @format */

const divisibleByK = (arr, k) => {
  let map = new Map();

  let sum = 0;
  let count = 0;

  map.set(0, 1);

  for (let val of arr) {
    sum += val;

    let rem = ((sum % k) + k) % k;

    if (map.has(rem)) {
      count += map.get(rem);
    }

    map.set(rem, (map.get(rem) || 0) + 1);
  }
  return count;
};
