/** @format */

const con = (arr, k) => {
  let map = new Map();
  let sum = 0;

  map.set(0, -1);

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    let rem = ((arr[i] % k) + k) % k;

    if (map.has(rem) && i - map.get(rem) >= 2) {
      return true;
    }

    if (!map.has(rem)) {
      map.set(rem, i);
    }
  }
};
