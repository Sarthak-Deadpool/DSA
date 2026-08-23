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
  // means find all entries as array then sort them in decreasing order in 
  // basis of value then slice the array by requirment then map the value basis of key 
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((entry) => entry[0]);
};

const input = [1,1,1,3,2, 2, 3, 3,3];

console.log(topK(input, 2));