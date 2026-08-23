/** @format */

const conatainDuplicate = (arr) => {
  let set = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      return false;
    }

    set.add(arr[i]);
  }

  return true;
};

const input = [2, 3, 4, 5, 6];

console.log(conatainDuplicate(input));
