/** @format */

const twoSum = (arr, target) => {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], i);
  }

  for (let i = 0; i < arr.length; i++) {
    let val = target - arr[i];

    if (map.has(val) && map.get(val) !== i) {
      return [i, map.get(val)];
    }
  }

  return [-1, -1];
};

const input = [2, 5, 6, 7, 1, 3, 9, 4];

console.log(twoSum(input, 8));
