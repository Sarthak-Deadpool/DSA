/** @format */

const disapeared = (arr) => {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    let index = Math.abs(arr[i]) - 1;

    if (arr[index] > 0) {
      arr[index] *= -1;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      ans.push(i + 1);
    }
  }
  return ans;
};

// console.log(disapeared([4, 3, 2, 7, 8, 2, 3, 1]));

const maxSubArray = (arr) => {
  let maxEnd = arr[0];
  let maxSum = 0;

  for (let i = 1; i < arr.length; i++) {
    maxEnd = maxEnd + arr[i];
    maxEnd = Math.max(maxEnd, arr[i]);
    maxSum = Math.max(maxSum, maxEnd);
  }

  return maxSum;
};

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

const subArraySum = (arr, k) => {
  let map = new Map();

  map.set(0, 1);

  let sum = 0;
  let count = 0;

  for (let val of arr) {
    sum += val;

    let need = sum - k;

    if (map.has(need)) {
      count += map.get(need);
    }

    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
};

// console.log(subArraySum([1, 2, 3], 3));

const subArrayDiv = (arr, k) => {
  let map = new Map();
  map.set(0, 1);
  let sum = 0;
  let count = 0;

  for (let val of arr) {
    sum += val;

    let rem = ((sum % k) + k) % k;

    if (map.has(rem)) {
      count += map.get(rem);
    }

    map.set(rem, (map.get(rem) || 0) + 1);
  }

  return count;
};

//
const continuesSubArraySum = (arr, k) => {
  let map = new Map();
  map.set(0, -1);

  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    let rem = ((sum % k) + k) % k;

    if (map.has(rem) && i - map.get(rem) >= 2) {
      return true;
    }

    if (!map.has(rem)) {
      map.set(rem, i);
    }
  }
  return false;
};

console.log(continuesSubArraySum([23, 4, 4, 6, 7], 6));
