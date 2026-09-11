/** @format */

function dupl(arr) {
  let i = 1;
  let j = 1;

  console.log(arr);

  while (j < arr.length) {
    console.log("inside loop");
    if (arr[j] !== arr[j - 1]) {
      arr[i] = arr[j];
      i++;
    }
    j++;
  }
  return i;
}
