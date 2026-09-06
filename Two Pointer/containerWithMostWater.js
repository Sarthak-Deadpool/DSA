/** @format */

const mostWater = (arr) => {
  let i = 0;
  let j = arr.length - 1;
  let water = 0;
  let hight = 0;
  let width = 0;

  while (i < j) {
    width = j - i;
    hight = Math.min(arr[i], arr[j]);

    water = Math.max(water, width * hight);

    if (arr[i] < arr[j]) {
      i++;
    } else if (arr[i] > arr[j]) {
      j--;
    } else {
      i++;
      j--;
    }
  }
  return water;
};

console.log(mostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]));
