/** @format */

const topK = (arr, k) => {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }

  return [...map.entries()]
    .sort((a, b) => b - a)
    .slice(0, k)
    .filter((entry) => entry[0]);
};

const input = [1,1,1,3,2, 2, 3, 3,3];

console.log(topK(input, 2));