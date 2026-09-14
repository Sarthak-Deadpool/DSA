/**
 * @format
 * @param {number[]} arr
 * @return {boolean}
 */

var canReorderDoubled = function (arr) {
  let a = arr.sort((a, b) => Math.abs(a) - Math.abs(b));

  let map = new Map();

  for (let val of a) {
    map.set(val, (map.get(val) || 0) + 1);
  }

  for (let [key, val] of map) {
    if (key === 0) {
      if (map.get(0) % 2 !== 0) {
        return false;
      }
      map.set(0, 0);
      continue;
    }

    while (map.get(key) > 0) {
      if (!map.has(2 * key)) {
        return false;
      }

      if ((map.get(2 * key) || 0) === 0) {
        return false;
      }

      map.set(2 * key, map.get(2 * key) - 1);
      map.set(key, map.get(key) - 1);
    }
  }

  return true;
};
