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

console.log(maxpro([2, 3, -2, 4]));
