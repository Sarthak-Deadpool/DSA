/** @format */

// /** @format */

// // /** @format */

// // // /** @format */

// // // const disappear = (arr) => {
// // //   let ans = [];

// // //   for (let i = 0; i < arr.length; i++) {
// // //     let index = Math.abs(arr[i]) - 1;

// // //     if (arr[index] > 0) {
// // //       arr[index] *= -1;
// // //     }
// // //   }

// // //   for (let i = 0; i < arr.length; i++) {
// // //     if (arr[i] > 0) {
// // //       ans.push(i + 1);
// // //     }
// // //   }

// // //   return ans;
// // // };

// // // const input = [4, 3, 2, 7, 8, 2, 3, 1];

// // // console.log(disappear(input));

// // const diff = (a1, a2) => {
// //   let set1 = new Set(a1);
// //   let set2 = new Set(a2);

// //   let ans1 = [];
// //   let ans2 = [];

// //   for (let val of set1) {
// //     if (!set2.has(val)) {
// //       ans1.push(val);
// //     }
// //   }

// //   for (let val of set2) {
// //     if (!set1.has(val)) {
// //       ans2.push(val);
// //     }
// //   }

// //   return [ans1, ans2];
// // };

// // console.log(diff([1, 2, 3, 4], [2, 3, 5]));

// const major = (arr) => {
//   let candidate1 = null;
//   let candidate2 = null;

//   let count1 = 0;
//   let count2 = 0;

//   // finding candidate
//   for (let val of arr) {
//     if (val === candidate1) {
//       count1++;
//     } else if (count1 === 0) {
//       candidate1 = val;
//       count1++;
//     } else if (val === candidate2) {
//       count2++;
//     } else if (count2 === 0) {
//       candidate2 = val;
//       count2++;
//     } else {
//       count1--;
//       count2--;
//     }
//   }

//   count1 = 0;
//   count2 = 0;

//   // count frequency

//   for (let val of arr) {
//     if ((val === candidate1)) {
//       count1++;
//     } else if (val === candidate2) {
//       count2++;
//     }
//   }

//   // validation
//   let ans = [];

//   if (count1 > Math.floor(arr.length / 3)) {
//     ans.push(candidate1);
//   }
//   if (count2 > Math.floor(arr.length / 3)) {
//     ans.push(candidate2);
//   }

//   return ans;
// };

// // console.log(major([1, 1, 1, 3, 3, 2, 2, 2]));

// function maxsub(arr) {
//   let maxSum = 0;
//   let maxEnd = arr[0];

//   for (let i = 1; i < arr.length; i++) {
//     maxEnd = Math.max(maxEnd, maxEnd + arr[i]);
//     maxSum = Math.max(maxSum, maxEnd);
//   }
//   return maxSum;
// }

function max(arr) {
  let maxPro = Math.max(...arr);

  let minEnd = 1;
  let maxEnd = 1;

  for (let i = 0; i < arr.length; i++) {
    let temp = maxEnd + arr[i];

    maxEnd = Math.max(arr[i], temp, arr[i] * minEnd);
    minEnd = Math.min(arr[i], temp, arr[i] * minEnd);

    maxPro = Math.max(maxPro, maxEnd);
  }

  return maxPro;
}
