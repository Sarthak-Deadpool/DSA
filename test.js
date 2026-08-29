/** @format */

// /** @format */

// const ransome = (r, m) => {
//   let map1 = new Map();
//   let map2 = new Map();

//   for (let val of r) {
//     map1.set(val, (map1.get(val) || 0) + 1);
//   }

//   for (let val of m) {
//     map2.set(val, (map2.get(val) || 0) + 1);
//   }

//   for (let [key, val] of map1) {
//     if (map2.has(key) && map2.get(key) < val) {
//       return false;
//     }

//     if (!map2.has(key)) {
//       return false;
//     }
//   }

//   return true;
// };

// const r = "b";
// const m = "aaabnb";

// console.log(ransome(r, m));

// const unique = (s) => {
//   let map = new Map();

//   for (let val of s) {
//     map.set(val, (map.get(val) || 0) + 1);
//   }

//   for (let i = 0; i < s.length; i++) {
//     if (map.get(s[i]) === 1) {
//       return i;
//     }
//   }

//   return 0;
// };

// const s = "eeetcode";

// console.log(unique(s));

// const inter = (a1, a2) => {
//   let set1 = new Set(a1);
//   let set2 = new Set(a2);

//   let ans = [];

//   for (let val of set1) {
//     if (set2.has(val)) {
//       ans.push(val);
//     }
//   }

//   return ans;
// };

// const a1 = [1, 2, 3, 4, 1, 2];
// const a2 = [2, 3, 2, 3];

// console.log(inter(a1, a2));

// const inter2 = (a1, a2) => {
//   let map1 = new Map();
//   let map2 = new Map();

//   let ans = [];

//   for (let val of a1) {
//     map1.set(val, (map1.get(val) || 0) + 1);
//   }

//   for (let val of a2) {
//     map2.set(val, (map2.get(val) || 0) + 1);
//   }

//   for (let [key, val] of map1) {
//     if (map2.has(key)) {
//       let minfr = Math.min(map2.get(key), val);

//       while (minfr > 0) {
//         ans.push(key);
//         minfr--;
//       }
//     }
//   }
//   return ans;
// };

// const a1 = [1, 2, 3, 3, 4, 1, 2];
// const a2 = [2, 3, 2, 1, 3];

// console.log(inter2(a1, a2));

// const dis = (arr) => {
//   let ans = [];

//   for (let i = 0; i < arr.length; i++) {
//     let index = arr[i] - 1;

//     if (arr[i] > 0) {
//       arr[index] *= -1;
//     }
//   }

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > 0) {
//       ans.push(i + 1);
//     }
//   }

//   return ans;
// };

// const a = [1, 2, 4, 4];
// console.log(dis(a));

// /** @format */

// const dup = (arr) => {
//   let ans = [];

//   for (let i = 0; i < arr.length; i++) {
//     let index = Math.abs(arr[i]) - 1;

//     if (arr[index] < 0) {
//       ans.push(arr[i]);
//     } else {
//       arr[index] *= -1;
//     }
//   }
//   return ans;
// };

// const a = [1, 1, 2, 3, 4, 4, 2, 5, 4, 1, 3];

// console.log(dup(a));

//

/** @format */

const missing = (arr) => {
  let ans = 0;

  for (let i = 1; i <= arr.length; i++) {
    ans ^= i;
  }

  for (let i = 0; i < arr.length; i++) {
    ans ^= arr[i];
  }
  return ans;
};

const a = [3, 2, 0, 1];

console.log(missing(a));
