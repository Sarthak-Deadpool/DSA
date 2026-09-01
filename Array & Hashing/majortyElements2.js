/** @format */

// /** @format */

// const major = (arr) => {
//   let map = new Map();

//   let ans = [];
//   for (let val of arr) {
//     map.set(val, (map.get(val) || 0) + 1);
//   }

//   for (let [key, val] of map) {
//     if (val > Math.floor(arr.length / 3)) {
//       ans.push(key);
//     }
//   }

//   return ans;
// };

// console.log(major([1, 2]));

const major = (arr) => {
  let candidate1 = null;
  let candidate2 = null;

  let count1 = 0;
  let count2 = 0;

  // finding candidate
  for (let val of arr) {
    if (val === candidate1) {
      count1++;
    } else if (count1 === 0) {
      candidate1 = val;
      count1++;
    } else if (val === candidate2) {
      count2++;
    } else if (count2 === 0) {
      candidate2 = val;
      count2++;
    } else {
      count1--;
      count2--;
    }
  }

  count1 = 0;
  count2 = 0;

  // count frequency

  for (let val of arr) {
    if (val === candidate1) {
      count1++;
    } else if (val === candidate2) {
      count2++;
    }
  }

  // validation
  let ans = [];

  if (count1 > Math.floor(arr.length / 3)) {
    ans.push(candidate1);
  }
  if (count2 > Math.floor(arr.length / 3)) {
    ans.push(candidate2);
  }
};

console.log(major([1, 1, 1, 3, 3, 2, 2, 2]));
