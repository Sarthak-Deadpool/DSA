/** @format */

// /** @format */

// const happy = (num) => {
//   let set = new Set();

//   function nextNumber(num) {
//     let nextNum = 0;
//     while (num > 0) {
//       let digit = num % 10;
//       nextNum += digit * digit;
//       num = Math.floor(num / 10);
//     }
//     return nextNum;
//   }

//   while (!set.has(num)) {
//     set.add(num);
//     num = nextNumber(num);

//     if (num === 1) {
//       return true;
//     }
//   }

//   return false;
// };

// console.log(happy());

// const iso = (s, t) => {
//   let map = new Map();

//   for (let i = 0; i < s.length; i++) {
//     if (map.has(s[i]) && map.get(s[i]) !== t[i]) {
//       return false;
//     }
//     if (!map.has(s[i]) && Array.from(map.values()).includes(t[i])) {
//       return false;
//     }

//     map.set(s[i], t[i]);
//   }

//   return true;
// };

// console.log(iso("aadd", "eeeg"));

// const pattern = (s, t) => {
//   let map = new Map();
//   let arr = t.split(" ");

//   for (let i = 0; i < s.length; i++) {
//     if (map.has(s[i]) && map.get(s[i]) !== arr[i]) {
//       return false;
//     }

//     if (!map.has(s[i]) && Array.from(map.values()).includes(arr[i])) {
//       return false;
//     }

//     map.set(s[i], arr[i]);
//   }

//   return true;
// };

// console.log(pattern("abca", "dog cat cat dog"));

// const major = (arr) => {
//   let map = new Map();

//   for (let val of arr) {
//     map.set(val, (map.get(val) || 0) + 1);
//   }

//   for (let [key, val] of map) {
//     if (val > Math.floor(arr.length / 2)) {
//       return key;
//     }
//   }
//   return 0;
// };

// console.log(major([1, 1, 2, 3]));

// const disappear = (arr) => {
//   let ans = [];

//   for (let i = 0; i < arr.length; i++) {
//     let index = Math.abs(arr[i]) - 1;

//     if (arr[index] > 0) {
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

// console.log(disappear([1,1]));

// const duplicate = (arr) => {
//   let ans = [];

//   for (let i = 0; i < arr.length; i++) {
//     let index = Math.abs(arr[i]) - 1;

//     if (arr[index] < 0) {
//       ans.push(index + 1);
//     } else {
//       arr[index] *= -1;
//     }
//   }
//   return ans;
// };

// console.log(duplicate([4, 3, 2, 7, 8, 2, 3, 1]));

// const mismatch = (arr) => {
//   let set = new Set();
//   let ans = [];
//   for (let val of arr) {
//     if (set.has(val)) {
//       ans.push(val);
//     }
//     set.add(val)
//   }

//   for (let i = 1; i <= arr.length; i++) {
//     if (!set.has(i)) {
//       ans.push(i);
//     }
//   }

//   return ans;
// };

// console.log(mismatch([1, 2, 1, 4]));

// const missing = (arr) => {
//   let ans = 0;

//   for (let i = 1; i <= arr.length; i++) {
//     ans ^= i;
//   }

//   for (let i = 0; i < arr.length; i++) {
//     ans ^= arr[i];
//   }

//   return ans;
// };

// console.log(missing([9, 6, 4, 2, 3, 5, 7, 0, 1]));

// const diff = (a1, a2) => {
//   let set1 = new Set(a1);
//   let set2 = new Set(a2);

//   let ans1 = [];
//   let ans2 = [];
//   for (let val of set1) {
//     if (!set2.has(val)) {
//       ans1.push(val);
//     }
//   }

//   for (let val of set2) {
//     if (!set1.has(val)) {
//       ans2.push(val);
//     }
//   }

//   return [ans1, ans2];
// };

// console.log(diff([1, 2, 3, 4 , 5], [1, 2, 2, 3, 4]));

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

// console.log(major([1, 1 ,2, 2]));

// const maximumSub = (arr) => {
//   let maxSum = arr[0];
//   let maxEnd = arr[0];

//   for (let i = 1; i < arr.length; i++) {
//     maxEnd = Math.max(arr[i], maxEnd + arr[i]);

//     maxSum = Math.max(maxEnd, maxSum);
//   }

//   return maxSum;
// };

// console.log(maximumSub([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/** @format */

const maxpro = (arr) => {
  let maxEnd = 1;
  let minEnd = 1;

  let maxPro = Math.max(...arr);

  for (let i = 0; i < arr.length; i++) {
    let tempMax = maxEnd * arr[i];
    maxEnd = Math.max(tempMax, minEnd * arr[i], arr[i]);
    minEnd = Math.min(tempMax, minEnd * arr[i], arr[i]);

    maxPro = Math.max(maxPro, maxEnd);
  }
  return maxPro;
};

console.log(maxpro([-2, 0, -1]));
